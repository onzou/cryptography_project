const fs = require("fs");
const path = require("path");
const solc = require("solc");

// const inboxPath = path.resolve(__dirname, "contracts", "Inbox.sol");
const lotteryPath = path.resolve(__dirname, "contracts", "BillManagement.sol");

const source = fs.readFileSync(lotteryPath,"utf-8");

// console.log(solc.compile(source,1).contracts[":BillManagement"]);
module.exports = solc.compile(source,1).contracts[":BillManagement"];;
