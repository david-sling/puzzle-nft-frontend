import { ethers } from "ethers";
import { useCallback, useEffect, useState } from "react";
import { ethereum, provider } from "../config/ethereum";

const useWallet = () => {
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState(NaN);

  const getAccount = async () => {
    const [account] =
      (await ethereum.request?.({
        method: "eth_requestAccounts",
      })) || [];
    console.log({ account });
    setAccount(account);
  };

  const getBalance = useCallback(async () => {
    const balance = await provider.getBalance(account);
    setBalance(parseFloat(ethers.utils.formatEther(balance)));
  }, [account]);

  useEffect(() => {
    window.ethereum.on("accountsChanged", async () => {
      getAccount();
    });
    getAccount();
  }, []);

  useEffect(() => {
    getBalance();
  }, [getBalance]);

  return { account, balance };
};

export default useWallet;
