import { ethers } from "ethers";
import { CONTRACT_ADDRESS } from "./constants";
import PuzzleABI from "artifacts/contracts/Puzzle.sol/Puzzle.json";
import { Puzzle as PuzzleProps } from "typechain-types";

const ethereum = typeof window === "undefined" ? {} : window.ethereum;
export const checkMetamaskInstalled = () =>
  typeof window !== "undefined" && typeof window.ethereum !== "undefined";

export const provider = checkMetamaskInstalled()
  ? new ethers.providers.Web3Provider(ethereum)
  : undefined;

const signer = checkMetamaskInstalled() ? provider?.getSigner() : undefined;

const getContract = <T extends ethers.Contract>(
  addressOrName: string,
  contractInterface: ethers.ContractInterface,
  signerOrProvider?: ethers.providers.Provider | ethers.Signer | undefined
) =>
  new ethers.Contract(addressOrName, contractInterface, signerOrProvider) as T;

export const Puzzle = getContract<PuzzleProps>(
  CONTRACT_ADDRESS,
  PuzzleABI.abi,
  signer
);

export { ethereum };
