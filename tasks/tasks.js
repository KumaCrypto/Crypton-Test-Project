const hre = require("hardhat");
const ethers = hre.ethers;

const CryptonArtifacts = require("./artifacts/contracts/CryptonDonation.sol/CryptonDonation.json");
const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";

task("SendDonation", "Send donation to CryptonStudio")
  .addParam("amount", "The amount you want to donate")
  .setAction(async (taskArgs) => {


    // const cryptonDonation = await ethers.getContractAt(CryptonArtifacts.abi, contractAddress);




    //taskArgs.amount = ethers.utils.hexValue(taskArgs.amount);
    let unsignedTx = await contactSendInstance.populateTransaction.release(contractAddress, amount)

    let response = await wallet.sendTransaction(unsignedTx);
    await response.wait();



    // Тут другой способ пробовал, но тоже не прошел
    // let tx = {
    //   to: cryptonDonation.address,
    //   value: await ethers.utils.formatEther(taskArgs.amount)
    // }

    // await ethers.provider.sendTransaction(tx);
});

task("withdrawFunds", "Withdraw funds from account balance")
  .addParam("amount", "The amount you want to withdraw")
  .setAction(async (taskArgs) => {
    
    const cryptonDonation = await ethers.getContractAt(CryptonArtifacts.abi, contractAddress);
    await cryptonDonation.withdrawFunds(taskArgs.amount);
});