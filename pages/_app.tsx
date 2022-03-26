import "styles/globals.scss";
import type { AppProps } from "next/app";
import Layout from "components/common/Layout";
import { WalletProvider } from "context/wallet";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <WalletProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </WalletProvider>
    </>
  );
}

export default MyApp;
