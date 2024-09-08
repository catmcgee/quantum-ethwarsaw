require("@nomicfoundation/hardhat-toolbox");

const PRIVATE_KEY = process.env.PRIVATE_KEY || "";

// Optional: Log the private key length for debugging (DO NOT log the full key)
console.log("Private key length:", PRIVATE_KEY.length);

module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      },
      viaIR: true
    }
  },
  networks: {
    sepolia: {
      url: `https://eth-sepolia.blastapi.io/f07ef614-05fd-4e03-9a36-be1dc6aefe17`,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : []
    },
    mantle: {
      url: "https://rpc.testnet.mantle.xyz",
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : []
    },
    celo: {
      url: "https://alfajores-forno.celo-testnet.org",
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : []
    },
    zircuit: {
      url: "https://zircuit1-mainnet.p2pify.com",
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : []
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY || ""
  }
};