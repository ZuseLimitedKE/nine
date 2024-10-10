// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

contract Nine {
    // Event emitted when a CID is stored
    event CidStored(string payeeAddress, string cid, uint256 timestamp);

    // Event emitted when a payment is made
    event PaymentMade(
        address indexed payer,
        address indexed payee,
        uint256 amount,
        uint256 timestamp,
        string cid
    );

    // Function to store the CID
    function storeCid(string memory cid, string memory payeeAddress) public {
        // Emit the event with the CID and sender's address
        emit CidStored(payeeAddress, cid, block.timestamp);
    }

    // Function to make a payment
    function payForRequest(
        address payable payee,
        uint256 amount,
        string memory cid
    ) public payable {
        require(msg.value > 0, "Send some Base");
        require(payee != address(0), "Invalid payee address");
        // (bool sent, ) = payee.call{value: msg.value}("");
        // require(sent, "Failed to send Base");
        // Transfer the amount to the payee
        payee.transfer(msg.value);

        // Emit the event with payment details
        emit PaymentMade(msg.sender, payee, amount, block.timestamp, cid);
    }

    receive() external payable {}
}
