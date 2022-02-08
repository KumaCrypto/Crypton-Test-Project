const hre = require("hardhat");
const ethers = hre.ethers;

async function main() {
  const CryptonDonation = await ethers.getContractFactory("Transfers");
  const cryptonDonation = await CryptonDonation.deploy();

  await cryptonDonation.deployed();
  
  console.log("CryptonDonation deployed to: ", transfers.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
