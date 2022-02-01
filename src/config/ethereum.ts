import { ethers } from "ethers";
import { CONTRACT_ADDRESS } from "./constants";
import BonFyr from "../artifacts/contracts/MyNFT.sol/BonFyr.json";
import { Puzzle } from "../typechain-types";
import { ExternalProvider } from "@ethersproject/providers";

const { ethereum } = window;

export const provider = new ethers.providers.Web3Provider(ethereum);
const signer = provider.getSigner();

export const PUZZLE = new ethers.Contract(
  CONTRACT_ADDRESS,
  BonFyr.abi,
  signer
) as Puzzle;

export { ethereum };
