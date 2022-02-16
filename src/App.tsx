import * as React from "react";
import Header from "./components/common/Header";
import useWallet from "./hooks/useWallet";

const App = () => {
  const { account, balance, currentChain } = useWallet();
  console.log({ account, balance, currentChain });
  return (
    <div>
      <Header />
      {account}
      <br />
      {balance}
    </div>
  );
};

export default App;
