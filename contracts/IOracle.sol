//SPDX-License-Identifier:MIT
pragma solidity ^0.8.20;

contract IOracle {

    event DataRequested(uint256 requestId, string propertyId);
    event DataFulfilled(uint256 requestId, uint256 data);

    struct Request {
        uint256 reqId;
        address from;
        string prsopertyId;
        uint256 data;
    }

    mapping (uint256 => Request) public requests;

    function requestData(uint256 _id,string memory propertyId) public returns (uint256) {
        requests[_id] = Request(_id, msg.sender, propertyId, 0);
        emit DataRequested(_id, propertyId);
        return _id;
    }

    function fulfillData(uint256 _id, uint256 _response) public {
        Request storage request = requests[_id];
        uint256 valueInWei = _response * 1e9;
        request.data = valueInWei;
        emit DataFulfilled(_id, _response);

    }

    function getData(uint256 _id) public view returns (uint256) {
        return requests[_id].data;
    }

}