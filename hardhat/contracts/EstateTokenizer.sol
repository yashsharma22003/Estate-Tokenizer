// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

interface IOracle {
    function requestData(uint256 id, string memory propertyId) external returns (uint256);
    function getData(uint256 requestId) external view returns (uint256);
}


contract EstateTokenizer is ERC20, Ownable{

    address public propertyOwner;
    string public propertyDetails;
    uint256 public valuation;
    address public priceOracle;
    IOracle public oracle;
    string public propId;

event TokenRequested(uint256 indexed timestamp,string propId, uint256 requestId);
event TokensMinted(address to, uint256 indexed amount, uint256 propValuation);
    struct requestTimestamp {

        address requester;
        uint256 timestamp;

    }

    mapping(address => uint256[]) public requests;
    mapping(address => requestTimestamp) public lastRequestTimestamp;

    constructor(string memory _propId, string memory _symbol, string memory _details, uint256 _initialSupply, address _owner, address _oracleAddress) ERC20( _propId, _symbol ) Ownable( _owner) {

        propId = _propId;
        propertyOwner = _owner;
        propertyDetails = _details;
        priceOracle = _oracleAddress;
        oracle = IOracle(_oracleAddress);
        _mint(_owner, _initialSupply * (10 ** decimals()));
        
    }

    function buyTokens() external payable {
        require(msg.value > 0, "Send ETH to buy tokens");
        require(lastRequestTimestamp[msg.sender].timestamp < block.timestamp + 100, "Token Request Timed-out Request Again");
        valuation = fetchValuation(requests[msg.sender].length + uint256(uint160(msg.sender)));
        uint256 tokenPrice = valuation * (10 ** decimals()) / totalSupply();
        uint256 amountToBuy = (msg.value * 1e9 * (10 ** decimals() / 1e9) ) / tokenPrice;
        require(amountToBuy > 0, "Not enough ETH sent");
        _transfer(owner(), msg.sender, amountToBuy);
        emit TokensMinted(msg.sender, amountToBuy, valuation);
    }

    function requestToken() external {
        requests[msg.sender].push(1);
        uint256 requestId = requests[msg.sender].length + uint256(uint160(msg.sender));
        requestValuation(requestId);
        lastRequestTimestamp[msg.sender] = requestTimestamp(msg.sender, block.timestamp);
        emit TokenRequested(block.timestamp, propId, requestId);
    }

    function requestValuation(uint256 requestId) public returns (uint256){
        return oracle.requestData( requestId, propId);
    }

    function fetchValuation(uint256 _id) public view returns (uint256) {
        return oracle.getData(_id);
    }

     function withdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

}