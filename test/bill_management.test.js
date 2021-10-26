const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider()); //providing the ethereum network we are gonna use
const {interface, bytecode } = require('../compile');

let accounts = null;
let billManager = null;

beforeEach(async ()=>
{
    accounts = await web3.eth.getAccounts();
    billManager = await new web3.eth.Contract(JSON.parse(interface))
                        .deploy({data: bytecode})
                        .send({from: accounts[0], gas: "1000000"});
});

describe("testing lottery", ()=>
{
    it("Is deploy ok",()=>
    {
        assert.ok(billManager.options.address);
    });

    it("account entering ",async ()=>
    {
        await billManager.methods.enter()
                            .send(
                            {
                                from: accounts[0], 
                                value: web3.utils.toWei("0.02", "ether")
                            });
        console.log(billManager.methods);
        const players = await billManager.methods.getPlayers().call({from: accounts[0]});

        assert.equal(players[0], accounts[0]);
        assert.equal(1, players.length);
        
    });


});