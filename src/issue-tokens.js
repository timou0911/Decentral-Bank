const TruffleContract = require('truffle-contract');
const myContractArtifact = require('./truffle_abis/DecentralBank.json');
const DecentralBank = TruffleContract(myContractArtifact);

module.exports = async function issueRewards(callback) {
    let decentralBank = await DecentralBank.deployed()
    await decentralBank.issueTokens()
    console.log("Tokens have been issued successfully")
    callback()
}