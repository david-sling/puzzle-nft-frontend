import { ethers } from "ethers";
import { useCallback, useEffect, useState } from "react";
import { ALLOWED_CHAINS } from "../config/constants";
import { ethereum, provider } from "../config/ethereum";
import { Chain } from "../interfaces";

const useWallet = () => {
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState(NaN);
  const [currentChain, setCurrentChain] = useState<Chain | undefined>(
    undefined
  );

  const getCurrentChain = async (id?: number) => {
    const chainId = id || (await provider.getNetwork()).chainId;
    setCurrentChain(
      ALLOWED_CHAINS.find((allowed) => chainId === allowed.chainId)
    );

    window.ethereum.on("chainChanged", getCurrentChain);
  };

  const getAccount = async () => {
    const [account] =
      (await ethereum.request?.({
        method: "eth_requestAccounts",
      })) || [];
    console.log({ account });
    setAccount(account);

    window.ethereum.on("accountsChanged", getAccount);
  };

  const getBalance = useCallback(async () => {
    const balance = await provider.getBalance(account);
    setBalance(parseFloat(ethers.utils.formatEther(balance)));
  }, [account]);

  useEffect(() => {
    getAccount();
    getCurrentChain();
  }, []);

  useEffect(() => {
    getBalance();
  }, [getBalance]);

  return { account, balance, currentChain };
};

export default useWallet;
