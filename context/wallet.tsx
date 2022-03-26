import {
  useCallback,
  useEffect,
  useState,
  createContext,
  FC,
  useContext,
} from "react";
import { ethers } from "ethers";
import { ALLOWED_CHAINS } from "config/constants";
import { ethereum, checkMetamaskInstalled, provider } from "config/ethereum";
import { Chain } from "interfaces";

interface Props {
  account: string;
  balance: number;
  isMetaMaskInstalled: boolean;
  currentChain?: Chain;
}
const WalletContext = createContext<Props>({
  account: "",
  balance: NaN,
  isMetaMaskInstalled: false,
});

export const useWallet = () => useContext(WalletContext);

export const WalletProvider: FC = (props) => {
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState(NaN);
  const [currentChain, setCurrentChain] = useState<Chain | undefined>(
    undefined
  );
  const isMetaMaskInstalled = checkMetamaskInstalled();

  const getCurrentChain = async (id?: number) => {
    if (!checkMetamaskInstalled()) return setCurrentChain(undefined);
    const chainId = id || (await provider?.getNetwork())?.chainId || NaN;
    setCurrentChain(
      ALLOWED_CHAINS.find((allowed) => chainId === allowed.chainId)
    );
    ethereum.on("chainChanged", getCurrentChain);
  };

  const getAccount = async () => {
    if (!checkMetamaskInstalled()) return setAccount("");
    const [account] =
      (await ethereum.request?.({
        method: "eth_requestAccounts",
      })) || [];
    console.log({ account });
    setAccount(account);

    ethereum.on("accountsChanged", getAccount);
  };

  const getBalance = useCallback(async () => {
    if (!checkMetamaskInstalled()) return setBalance(0);
    if (!account) return;
    const balance = (await provider?.getBalance(account)) || NaN;
    setBalance(parseFloat(ethers.utils.formatEther(balance)));
  }, [account]);

  useEffect(() => {
    getAccount();
    getCurrentChain();
  }, []);

  useEffect(() => {
    getBalance();
  }, [getBalance]);

  return (
    <WalletContext.Provider
      {...props}
      value={{ account, balance, currentChain, isMetaMaskInstalled }}
    />
  );
};
