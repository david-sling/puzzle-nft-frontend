import React from "react";
import useWallet from "./hooks/useWallet";

const App = () => {
  const { account, balance } = useWallet();
  return (
    <div>
      {account}
      <br />
      {balance}
    </div>
  );
};

export default App;
