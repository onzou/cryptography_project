const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider()); //providing the ethereum network we are gonna use
const {interface, bytecode } = require('./../compile');

let accounts = null;
let inbox = null;
const INITIAL_MESSAGE = "Hi there!";

beforeEach(async ()=>
{
    accounts = await web3.eth.getAccounts();
    inbox = await new web3.eth.Contract(JSON.parse(interface))
                        .deploy({data: bytecode, arguments: [INITIAL_MESSAGE]})
                        .send({from: accounts[0], gas: "1000000"});
});

describe("Inbox",()=>
{
    it("Deploy a contract",()=>
    {
        assert.ok(inbox.options.address);
    });

    it("verifying method message", async ()=>
    {
        const message = await inbox.methods.message().call();
        assert.equal(message, INITIAL_MESSAGE);
    });

    it("can modify message",async ()=>
    {
        await inbox.methods.setMessage("bye").send({from: accounts[0]});
        const message = await inbox.methods.message().call();
        assert.equal(message, "bye");
    });
});

/*
class Car 
{
    park()
    {
        return "stopped";
    }

    drive()
    {
        return "vroom";
    }
}
let car = null;

beforeEach(()=>
{
    car = new Car();
});

describe("Car",()=>
{
    it("can park",()=>
    {
        assert.equal(car.park(), 'stopped');
    });

    it("can drive",()=>
    {
        assert.equal(car.drive(),"vroom");
    })
});*/