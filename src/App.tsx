import React from "react";
import useWallet from "./hooks/useWallet";

const App = () => {
  const { account, balance, currentChain } = useWallet();
  console.log({ account, balance, currentChain });
  return (
    <div>
      {account}
      <br />
      {balance}
    </div>
  );
};

export default App;
