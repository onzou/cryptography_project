pragma solidity ^0.4.17;

contract Lottery
{
    address public manager;

}

/*
    msg.sender = address of the account of the sender. 
    msg.data: data provided to the transacdtion
    msg.gas: the number of gas 
    msg.value: amount of ether sent with the call 
*/