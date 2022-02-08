// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract CryptonDonation is Ownable {

  event DonationReceived(address indexed _donator, uint _value);
  event FundsWithdrawn(uint _amount, uint _blockNumber);

  address[] private donators;
  mapping (address => uint) private donationAmount;


  receive() external payable {
    require(msg.value > 0 ether, "Donation must be greater than 0!");

    if (donationAmount[msg.sender] == 0) {
      donators.push(msg.sender);
    }

    donationAmount[msg.sender] += msg.value;
    emit DonationReceived(msg.sender, msg.value);
  }

  function withdrawFunds(uint _amount) external onlyOwner {
    require(_amount <= address(this).balance,
    "There aren't enough funds on the contract!");

    payable(msg.sender).transfer(_amount);
    emit FundsWithdrawn(_amount, block.number);
  }

  function getDonators() public view returns(address[] memory) {
    return donators;
  }

  function getDonationAmount(address _donator) public view returns(uint) {
    return donationAmount[_donator];
  }
}