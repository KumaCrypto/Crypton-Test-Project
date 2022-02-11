const { expect } = require("chai");
const { ethers } = require("hardhat");


describe("CryptonDonation", function () {

  let CryptonDonation,
    Donation;

  let owner,
    acc1;


  before(async function () {
    CryptonDonation = await ethers.getContractFactory("CryptonDonation");
  });


  beforeEach(async function () {
    [owner, acc1] = await ethers.getSigners();

    Donation = await CryptonDonation.deploy();
    await Donation.deployed();
  });



  describe('Deployment', function () {

    it("Should set the right owner", async function () {

      expect(await Donation.owner()).to.equal(owner.address);
    });



    it("Initially everything should be empty or equal to 0", async function () {

      expect(await Donation.
        getDonationAmount(owner.address))
        .to.equal(0);


      expect(await Donation.getDonators()).to.be.empty;


      expect(await ethers.provider.getBalance(Donation.address)).to.equal(0);
    });
  });

  describe('Receiving a donation', function () {
    it("If the donation without ethers - revert", async function () {

      let options = {
        to: Donation.address,
        value: await ethers.utils.parseEther("0")
      }

      await expect(acc1.sendTransaction(options)).to.be.revertedWith
        ("Donation must be greater than 0!");

      expect(await Donation
        .getDonationAmount(acc1.address)).to.equal(0);


      expect(await Donation.getDonators()).to.be.empty;

      expect(await ethers.provider
        .getBalance(Donation.address)).to.equal(0);

    });



    it("New donator added to the array", async function () {

      let options = {
        to: Donation.address,
        value: await ethers.utils.parseEther("1")
      }

      await acc1.sendTransaction(options);


      let donators = await Donation.getDonators();
      expect(donators[0]).to.equal(acc1.address);
    });



    it("Donator already added to the array is not added again", async function () {

      let options = {
        to: Donation.address,
        value: await ethers.utils.parseEther("1")
      }

      await acc1.sendTransaction(options);
      await acc1.sendTransaction(options);


      let donators = await Donation.getDonators();
      expect(donators[0]).to.equal(acc1.address);
      expect(donators[1]).to.equal(undefined);
    });



    it("The balance of the contract is replenished", async function () {

      let options = {
        to: Donation.address,
        value: await ethers.utils.parseEther("1")
      }

      await acc1.sendTransaction(options);

      expect(await ethers.provider.getBalance(Donation.address))
        .to.equal(options.value);

    });



    it("The amount of the donation is recorded in the mapping", async function () {

      let options = {
        to: Donation.address,
        value: await ethers.utils.parseEther("1")
      }

      await acc1.sendTransaction(options);

      expect(await Donation.getDonationAmount(acc1.address))
        .to.equal(options.value);
    });



    it("Donation amount increases in mapping", async function () {

      let options = {
        to: Donation.address,
        value: await ethers.utils.parseEther("1")
      }

      await acc1.sendTransaction(options);
      await acc1.sendTransaction(options);

      expect(await Donation.getDonationAmount(acc1.address))
        .to.equal(ethers.utils.parseEther("2"));
    });




    it("Event work correctly ", async function () {

      let options = {
        to: Donation.address,
        value: await ethers.utils.parseEther("1")
      }


      await expect(acc1.sendTransaction(options))
        .to.emit(Donation, 'DonationReceived')
        .withArgs(acc1.address, options.value);
    });




    it("Full fucntion logic", async function () {

      let options = {
        to: Donation.address,
        value: await ethers.utils.parseEther("1")
      }

      await acc1.sendTransaction(options)

      let donators = await Donation.getDonators();
      expect(donators[0]).to.equal(acc1.address);


      expect(await ethers.provider.getBalance(Donation.address))
        .to.equal(options.value);

      expect(await Donation.getDonationAmount(acc1.address))
        .to.equal(options.value);

      await expect(acc1.sendTransaction(options))
        .to.emit(Donation, 'DonationReceived')
        .withArgs(acc1.address, options.value);
    });

  });

  describe('withdrawFunds', function () {

    it('Reverted if requested amount is greater than balance', async function () {
      expect(await ethers.provider.getBalance(Donation.address))
        .to.equal(0);

      await expect(Donation.withdrawFunds(100))
        .to.be
        .revertedWith("There aren't enough funds on the contract!");
    });



    it('Reverted if function called by non-owner', async function () {

      await expect(Donation.connect(acc1).withdrawFunds(1))
        .to.be
        .revertedWith("Ownable: caller is not the owner");
    });



    it("The owner's balance is replenished", async function () {


      let options = {
        to: Donation.address,
        value: await ethers.utils.parseEther("1")
      }

      await acc1.sendTransaction(options);

      await expect(await Donation.withdrawFunds(1000000))
        .to.changeEtherBalance(owner, 1000000);
    });


    it("Contract balance decreases", async function () {


      let options = {
        to: Donation.address,
        value: await ethers.utils.parseEther("1")
      }

      await acc1.sendTransaction(options);

      await expect(await Donation.withdrawFunds(1000000))
        .to.changeEtherBalance(Donation, -1000000);
    });


    it("Event FundsWithdrawn work correctly ", async function () {


      let options = {
        to: Donation.address,
        value: await ethers.utils.parseEther("1")
      }

      await acc1.sendTransaction(options);

      await expect(await Donation.withdrawFunds(1000000))
        .to.emit(Donation, "FundsWithdrawn").withArgs(1000000,
          await ethers.provider.getBlockNumber());
    });

  })
  
});
