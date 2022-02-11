const hre = require("hardhat");
const ethers = hre.ethers;

const contractAddress = "0xc4950aF760Db75eb1381d1CbB2fa088E03CC762F";

task("SendDonation", "Send donation to CryptonStudio")
  .addParam("amount", "The amount you want to donate (in ether)")
  .setAction(async (taskArgs) => {

    let wallet = await ethers.provider.getSigner();

    let tx = {
      to: contractAddress,
      value: ethers.utils.parseEther(`${taskArgs.amount}`).toHexString()
    }

    await wallet.sendTransaction(tx);
});

task("withdrawFunds", "Withdraw funds from account balance")
  .addParam("amount", "The amount you want to withdraw")
  .setAction(async (taskArgs) => {
    
    const cryptonDonation = await ethers.getContractAt("CryptonDonation", contractAddress);
    let amount = ethers.utils.parseEther(`${taskArgs.amount}`).toHexString();


    await cryptonDonation.withdrawFunds(amount);
});