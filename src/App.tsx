import React from "react";
import Header from "./components/common/Header";
import useWallet from "./hooks/useWallet";

const App = () => {
  const { account, balance, currentChain, isMetaMaskInstalled } = useWallet();
  console.log({ account, balance, currentChain });
  return (
    <div>
      <Header />
      {isMetaMaskInstalled ? (
        <>
          {account}
          <br />
          {balance}
        </>
      ) : (
        <p>Please install metamask</p>
      )}
    </div>
  );
};

export default App;
