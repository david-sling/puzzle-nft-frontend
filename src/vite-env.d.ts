/// <reference types="vite/client" />

import { ExternalProvider } from "@ethersproject/providers";
import { MetaMaskInpageProvider } from "@metamask/providers";

interface Provider extends ExternalProvider {
  [key: string]: any;
}

declare global {
  interface Window {
    ethereum: Provider;
  }
}
