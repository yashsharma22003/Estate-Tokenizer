//SPDX-License-Identifier:MIT
pragma solidity ^0.8.20;

import {IERC20} from '@openzeppelin/contracts/token/ERC20/IERC20.sol';

interface EstateTokenizer is IERC20 {
    function buyTokens() external payable;
    function requestToken() external;
    function propertyOwner() external view returns (address);
    function propertyDetails() external view returns (string memory);
    function valuation() external view returns (uint256);
    function propId() external view returns (string memory);
}

contract estateTokenGetter {


address[] public estateTokenAddresses;

function addtokenAddress(address _tokenAddress) public {

    estateTokenAddresses.push(_tokenAddress);
}

function getBalance(address _tokenAddress) public view returns (uint256) {
    EstateTokenizer token = EstateTokenizer(_tokenAddress);
    uint256 balance = token.balanceOf(msg.sender);
    return balance;
}

function getDetails(address _tokenAddress) public view returns (address, string memory, uint256, string memory) {
     EstateTokenizer token = EstateTokenizer(_tokenAddress);
     address owner = token.propertyOwner();
     string memory details = token.propertyDetails();
     uint256 valuation = token.valuation();
     string memory propId = token.propId();

     return (owner, details, valuation, propId);

}

}
