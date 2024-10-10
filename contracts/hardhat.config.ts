import { HardhatUserConfig } from "hardhat/config";
import "dotenv/config"
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.27",
  networks: {
    sepolia: {
      url: "https://sepolia.base.org", // Base Sepolia RPC URL
      accounts: [process.env.WALLET_PRIVATE_KEY], // Add your wallet's private key
    },
  },
};

export default config;
