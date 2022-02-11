const hre = require("hardhat");
const ethers = hre.ethers;

const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";

task("SendDonation", "Send donation to CryptonStudio")
  .addParam("amount", "The amount you want to donate")
  .setAction(async (taskArgs) => {
    
    taskArgs.amount = ethers.utils.hexValue(taskArgs.amount);
    let unsignedTx = await contactSendInstance.populateTransaction.release(contractAddress, amount)

    let response = await wallet.sendTransaction(unsignedTx);
    await response.wait();
});

task("withdrawFunds", "Withdraw funds from account balance")
  .addParam("amount", "The amount you want to withdraw")
  .setAction(async (taskArgs) => {
    
    const cryptonDonation = await ethers.getContractAt("CryptonDonation", contractAddress);
    await cryptonDonation.withdrawFunds(taskArgs.amount);
});