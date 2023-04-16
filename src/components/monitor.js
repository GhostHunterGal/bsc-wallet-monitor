//monitor.js
const { ethers } = require("ethers");
const providers = require("ethers/providers");

// Load environment variables from .env file
require("dotenv").config();

// BSC Testnet provider URL
const bscTestnetProviderUrl = process.env.BSC_TESTNET_PROVIDER_URL;

// Create a provider instance
console.log('bscTestnetProviderUrl:', bscTestnetProviderUrl);
const provider = new providers.JsonRpcProvider(bscTestnetProviderUrl);

// Function to monitor the balance of the specified addresses
async function monitorBalances(address) {
   console.log("Starting to monitor balances...");
 
   const balance = await provider.getBalance(address);
   const balanceInEther = ethers.formatEther(balance);
 
   console.log("Finished monitoring balances.");
   return [{ address, balance: balanceInEther }];
 }

module.exports = {
   monitorBalances,
};
