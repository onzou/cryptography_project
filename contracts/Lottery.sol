pragma solidity ^0.4.17;

contract Lottery
{
    address public manager;
    address[] public players;

    function Lottery() public 
    {
        manager = msg.sender;
    }

    function enter() public payable 
    {
        require(msg.value > .01 ether);
        players.push(msg.sender);
    }

    function getPlayers() public view returns (address[])
    {
        return players;
    }
    
    function random() private view returns (uint)
    {
        return uint(keccak256(block.difficulty, now, players));
    }
    
    function pickWinner() public 
    {
        require(msg.sender == manager);
        require(players.length > 0);
        uint index = random() % players.length;
        players[index].transfer(this.balance);
        players = new address[](0);

    }
}

/*
    msg.sender = address of the account of the sender. 
    msg.data: data provided to the transacdtion
    msg.gas: the number of gas 
    msg.value: amount of ether sent with the call 
*/