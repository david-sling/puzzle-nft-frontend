import { ExternalProvider } from "@ethersproject/providers";
import { FC, SVGProps } from "react";

interface Provider extends ExternalProvider {
  [key: string]: any;
}

declare global {
  interface Window {
    ethereum: Provider;
  }
}

declare module "*.svg" {
  const def: FC<SVGProps<SVGSVGElement>>;
  export default def;
}
