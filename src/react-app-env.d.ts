import { ExternalProvider } from "@ethersproject/providers";
import { MetaMaskInpageProvider } from "@metamask/providers";
/// <reference types="react-scripts" />

interface Provider extends ExternalProvider {
  [key: string]: any;
}

declare global {
  interface Window {
    ethereum: Provider;
  }
}
