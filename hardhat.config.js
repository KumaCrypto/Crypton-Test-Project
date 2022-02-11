require("dotenv").config();

require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
require("hardhat-tracer");

const { API_URL, PRIVATE_KEY, ETHERSCAN_KEY} = process.env;


module.exports = {
  solidity: "0.8.4",
  networks: {
    rinkeby: {
      url: `${API_URL}`,
      accounts: [`0x${PRIVATE_KEY}`]
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: `${ETHERSCAN_KEY}`
  },
};