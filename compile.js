const fs = require("fs");
const path = require("path");
const solc = require("solc");

// const inboxPath = path.resolve(__dirname, "contracts", "Inbox.sol");
const inboxPath = path.resolve(__dirname, "contracts", "Lottery.sol");

const source = fs.readFileSync(inboxPath,"utf-8");

// module.exports = solc.compile(source,1).contracts[":Inbox"];
// console.log(solc.compile(source,1).contracts);

module.exports = solc.compile(source,1).contracts[":Lottery"];