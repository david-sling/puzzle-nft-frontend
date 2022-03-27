import {
  useCallback,
  useEffect,
  useState,
  createContext,
  FC,
  useContext,
} from "react";
import { ethers } from "ethers";
import { ALLOWED_CHAINS, MINT_PRICE } from "config/constants";
import {
  ethereum,
  checkMetamaskInstalled,
  provider,
  Puzzle,
} from "config/ethereum";
import { Chain, Errored, Token } from "interfaces";

interface Props {
  account: string;
  balance: number;
  isMetaMaskInstalled: boolean;
  currentChain?: Chain;
  connect: () => Promise<string>;
  disconnect: () => void;
  mintToken: () => Promise<
    Errored<{
      minted: ethers.ContractTransaction;
      success: boolean;
    }>
  >;
  tokens?: Token[];
  lastMintedToken?: Token;
  minting: boolean;
}
const WalletContext = createContext<Props>({
  account: "",
  balance: NaN,
  isMetaMaskInstalled: false,
  connect: async () => "",
  disconnect: () => {},
  mintToken: async () => ({ error: "Function Not Loaded" }),
  minting: false,
});

export const useWallet = () => useContext(WalletContext);

export const WalletProvider: FC = (props) => {
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState(NaN);
  const [currentChain, setCurrentChain] = useState<Chain | undefined>(
    undefined
  );
  const isMetaMaskInstalled = checkMetamaskInstalled();
  const [listeningForAccountChange, setListeningForAccountChange] =
    useState(false);
  const [tokens, setTokens] = useState<Token[] | undefined>(undefined);
  const [lastMintedToken, setLastMintedToken] = useState<Token | undefined>(
    undefined
  );
  const [minting, setMinting] = useState(false);

  const getCurrentChain = async (id?: number) => {
    if (!checkMetamaskInstalled()) return setCurrentChain(undefined);
    const chainId = id || (await provider?.getNetwork())?.chainId || NaN;
    setCurrentChain(
      ALLOWED_CHAINS.find((allowed) => chainId === allowed.chainId)
    );
    ethereum.on("chainChanged", getCurrentChain);
  };

  const getAccount = async (overRideListener?: boolean): Promise<string> => {
    if (!overRideListener && !listeningForAccountChange) return "";
    if (!checkMetamaskInstalled()) {
      setAccount("");
      return "";
    }
    const [account] =
      (await ethereum.request?.({
        method: "eth_requestAccounts",
      })) || [];
    setAccount(account);
    return account;
  };

  const getBalance = useCallback(async () => {
    if (!checkMetamaskInstalled()) return setBalance(0);
    if (!account) return;
    const balance = (await provider?.getBalance(account)) || NaN;
    setBalance(parseFloat(ethers.utils.formatEther(balance)));
  }, [account]);

  const getTokens = async () => {
    const address = account || (await connect());
    if (!address) return undefined;
    const tokenCount = await Puzzle.balanceOf(address);
    const tokens = await Promise.all(
      Array.from(
        { length: parseInt(tokenCount.toString()) },
        async (_, idx) => {
          const tokenId = parseInt(
            (await Puzzle.tokenOfOwnerByIndex(address, idx)).toString()
          );
          const uri = await Puzzle.tokenURI(tokenId);
          return { tokenId, uri };
        }
      )
    );
    setTokens(tokens);
    return tokens;
  };

  const connect = async () => {
    const account = getAccount(true);
    if (!listeningForAccountChange) ethereum.on("accountsChanged", getAccount);
    setListeningForAccountChange(true);
    return account;
  };
  const disconnect = () => setAccount("");

  const mintToken = async (): Promise<
    Errored<{
      minted: ethers.ContractTransaction;
      success: boolean;
    }>
  > => {
    setMinting(true);
    try {
      const minter = account || (await connect());
      const minted = await Puzzle.payToMint(minter, {
        value: ethers.utils.parseEther(MINT_PRICE.toString()),
      });
      await minted.wait();
      const tokens = await getTokens();
      if (!tokens) throw "Couldn't fetch tokens";
      const lastMintedToken = tokens[tokens?.length - 1];
      setLastMintedToken(lastMintedToken);
      setMinting(false);
      return { minted, success: true };
    } catch (error) {
      setMinting(false);
      return { error };
    }
  };

  useEffect(() => {
    getCurrentChain();
  }, []);

  useEffect(() => {
    getBalance();
  }, [getBalance]);

  useEffect(() => {
    getTokens();
  }, [account]);

  return (
    <WalletContext.Provider
      {...props}
      value={{
        account,
        balance,
        currentChain,
        isMetaMaskInstalled,
        connect,
        disconnect,
        mintToken,
        tokens,
        lastMintedToken,
        minting,
      }}
    />
  );
};
