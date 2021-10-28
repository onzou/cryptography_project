const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
    "eye interest boost obscure talent real flavor tip teach disease parent absorb",
    "https://rinkeby.infura.io/v3/e366d7743b2b4c6a8c2306f4a71f2422",
);

const web3 = new Web3(provider);

const deploy = async() =>
{
    const accounts = await web3.eth.getAccounts();
    const resultDeployment = await new web3.eth.Contract(JSON.parse(interface))
                                .deploy({data: bytecode})
                                .send({ gas: "1000000", from: accounts[0]});
    console.log(interface);
    console.log(resultDeployment.options.address);

};
deploy();