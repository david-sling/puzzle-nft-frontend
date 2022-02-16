import { ethers } from "ethers";
import { CONTRACT_ADDRESS } from "./constants";
import PuzzleABI from "../artifacts/contracts/Puzzle.sol/Puzzle.json";

const { ethereum } = window;

export const provider = new ethers.providers.Web3Provider(ethereum);
const signer = provider.getSigner();

export const PUZZLE = new ethers.Contract(
  CONTRACT_ADDRESS,
  PuzzleABI.abi,
  signer
);

export { ethereum };
