// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;
import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";


contract Coffee {

     using Counters for Counters.Counter;
    Counters.Counter private _creatorIds;
    uint public creatorCounter;
    
    struct CreatorInfo {
       uint id;
       string username;
       string ipfsHash;
       address payable walletAddress;
       string userbio;
       uint donationsReceived;
       uint supporters;
    }

    event CreatorEvent (
       uint id,
       string username,
       address payable walletAddress,
       string ipfsHash,
       string userbio,
       uint donationsReceived,
       uint supporters
    );

    // payable address can receive ether
    address payable public owner;

    // payable constructor can receive ether. Assigning the contract deployer as the owner
    constructor() payable {
        owner = payable(msg.sender);
    }

    mapping(address => bool) isAddressExist;
    mapping(string => bool) isUsernameExist;
    CreatorInfo[] creatorList;

     // function to create new creator account
    function setCreatorDetail(
        string memory _username, 
        string memory _ipfsHash, 
        string memory _userbio) public { 

        // Validation
        require(bytes(_username).length > 0);
        require(bytes(_ipfsHash).length > 0);
        require(bytes(_userbio).length > 0);
        
        uint _donationsReceived;
        uint _supporters;
        /**
        *@dev require statment to block multiple entry
        */
        require(isAddressExist[msg.sender] == false, "Address already exist");
        require(isUsernameExist[_username] == false, "Username already exist");

         /* Increment the counter */
        _creatorIds.increment();

        creatorList.push(CreatorInfo(_creatorIds.current(),_username, _ipfsHash, payable(msg.sender), _userbio, _donationsReceived, _supporters));
        isAddressExist[msg.sender] = true;
        isUsernameExist[_username] = true;

        // emit a Creator event
        emit CreatorEvent (
        _creatorIds.current(),
        _username,
        payable(msg.sender),
        _ipfsHash,
        _userbio,
       _donationsReceived,
       _supporters
    );
    }

    // function to get all creators
    function getCreatorCount() public view returns (uint){
        return creatorList.length;
    }

      // Return the entire list of creators
    function getCreatorList() public view returns (CreatorInfo[] memory) {
        return creatorList;
    }

   // Get a single creator by id
    function getCreatorObj(uint _index) public view returns (CreatorInfo memory) {
         return creatorList[_index];
    }

     // function to get creator info
    function getCreatorInfo(uint index) public view returns (uint id, string memory,  string memory, address, string memory, uint, uint){
        CreatorInfo storage creatorDetail  = creatorList[index];
        return (
        creatorDetail.id,   
        creatorDetail.username, 
        creatorDetail.ipfsHash, 
        creatorDetail.walletAddress, 
        creatorDetail.userbio, 
        creatorDetail.donationsReceived, 
        creatorDetail.supporters);
    }

    /**
     * @dev send tip to a creator (sends an ETH tip and leaves a memo)
     * @param _message a nice message from the supporter
     */
    function sendTip(string memory _message, uint _index) public payable {
        creatorList[_index].donationsReceived += msg.value;
        creatorList[_index].supporters +=1;
        
        // Must accept more than 0 ETH for a coffee.
        require(msg.value > 0, "Insufficient balance!");
    }

    // function to get creator balance
    function getCreatorBal (uint index) public view returns (uint){
        CreatorInfo storage creatorDetail = creatorList[index];
        uint creatorBal = creatorDetail.donationsReceived;
        return creatorBal;
    }

    // Creator withdraw function. This function can be called by the creator
    function creatorWithdrawTip(uint index, uint amount) public returns (address payable _creatorAddress){
        CreatorInfo storage creatorDetail  =  creatorList[index];
        uint creatorBal = creatorDetail.donationsReceived;    
        address payable creatorAddress = creatorDetail.walletAddress;
        creatorList[index].donationsReceived -= amount;
        // check to ensure the amount to be withdrawn is not more than the creator balance
        require(amount <= creatorBal, "Insufficient bal");

        // Check to ensure the caller of the function is the creator
        require(msg.sender == creatorAddress, "You are not the creator");

        // // send input ether amount to creator
        // Note that "receipient" is declared as payable
        (bool success, ) = creatorAddress.call{value: amount}("");
        require(success, "Failed to send Ether");  
        return creatorAddress;
    }

    //  function to withdraw all ether from the contract
    function contractOwnerWithdraw() public {
        uint amount = address(this).balance;
        
        // send all ether to owner
        (bool success, ) = owner.call{value : amount}("");
        require(success, "Failed to send ether");
    }

    // function to get contract balance
    function contractBal() public view returns(uint){
       return address(this).balance;
    }
}