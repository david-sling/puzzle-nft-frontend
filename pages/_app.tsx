import "styles/globals.scss";
import type { AppProps } from "next/app";
import Layout from "components/common/Layout";
import { WalletProvider } from "context/wallet";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="favicon.svg" />
        <title>Ennefti | World&apos;s first Puzzle NFT</title>
      </Head>
      <WalletProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </WalletProvider>
    </>
  );
}

export default MyApp;
