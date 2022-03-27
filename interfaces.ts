export interface Chain {
  chainId: number;
  name: string;
}

export interface Token {
  tokenId: number;
  uri: string;
}

export type Errored<T, Error = any> = T | { error: Error };
