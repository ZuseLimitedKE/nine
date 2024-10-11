import {Web3} from "web3";
const web3: Web3  = new Web3("https://sepolia.base.org")
import abiFile from "../abi.json";

export const abi = abiFile.abi;
export default web3;