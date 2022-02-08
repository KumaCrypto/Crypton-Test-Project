const hre = require("hardhat");
const ethers = hre.ethers;

async function main() {
  const CryptonDonation = await ethers.getContractFactory("CryptonDonation");
  const cryptonDonation = await CryptonDonation.deploy();

  await cryptonDonation.deployed();
  
  console.log("CryptonDonation deployed to address: ", cryptonDonation.address);
  console.log("CryptonDonation deployed to block: ", await hre.ethers.provider.getBlockNumber());
  console.log("CryptonDonation owner is: ", await (cryptonDonation.provider.getSigner() ).getAddress() );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
