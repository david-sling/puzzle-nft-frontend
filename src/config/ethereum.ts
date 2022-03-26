import { ethers } from "ethers";
import { CONTRACT_ADDRESS } from "./constants";
import PuzzleABI from "../artifacts/contracts/Puzzle.sol/Puzzle.json";

const { ethereum } = window;
export const checkMetamaskInstalled = () =>
  typeof window.ethereum !== "undefined";

console.log(checkMetamaskInstalled(), window.ethereum);

export const provider = checkMetamaskInstalled()
  ? new ethers.providers.Web3Provider(ethereum)
  : undefined;

const signer = checkMetamaskInstalled() ? provider?.getSigner() : undefined;
export const PUZZLE = new ethers.Contract(
  CONTRACT_ADDRESS,
  PuzzleABI.abi,
  signer
);

export { ethereum };
