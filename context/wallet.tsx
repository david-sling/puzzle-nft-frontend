import {
  useCallback,
  useEffect,
  useState,
  createContext,
  FC,
  useContext,
} from "react";
import { ethers } from "ethers";
import { ALLOWED_CHAINS, mintPrice } from "config/constants";
import {
  ethereum,
  checkMetamaskInstalled,
  provider,
  Puzzle,
} from "config/ethereum";
import { Chain } from "interfaces";

interface Props {
  account: string;
  balance: number;
  isMetaMaskInstalled: boolean;
  currentChain?: Chain;
  connect: () => Promise<string>;
  disconnect: () => void;
  mintToken: () => Promise<
    | {
        minted: ethers.ContractTransaction;
        success: boolean;
      }
    | {
        error: any;
      }
  >;
}
const WalletContext = createContext<Props>({
  account: "",
  balance: NaN,
  isMetaMaskInstalled: false,
  connect: async () => "",
  disconnect: () => {},
  mintToken: async () => ({ error: "Function Not Loaded" }),
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
    console.log({ account });
    setAccount(account);
    return account;
  };

  const getBalance = useCallback(async () => {
    if (!checkMetamaskInstalled()) return setBalance(0);
    if (!account) return;
    const balance = (await provider?.getBalance(account)) || NaN;
    setBalance(parseFloat(ethers.utils.formatEther(balance)));
  }, [account]);

  const connect = async () => {
    const account = getAccount(true);
    ethereum.on("accountsChanged", getAccount);
    setListeningForAccountChange(true);
    return account;
  };
  const disconnect = () => setAccount("");

  const mintToken = async (): Promise<
    | {
        minted: ethers.ContractTransaction;
        success: boolean;
      }
    | {
        error: any;
      }
  > => {
    try {
      const minter = account || (await connect());
      const minted = await Puzzle.payToMint(minter, {
        value: ethers.utils.parseEther(mintPrice.toString()),
      });
      console.log({ minted });
      return { minted, success: true };
    } catch (error) {
      return { error };
    }
  };

  useEffect(() => {
    getCurrentChain();
  }, []);

  useEffect(() => {
    getBalance();
  }, [getBalance]);

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
      }}
    />
  );
};
