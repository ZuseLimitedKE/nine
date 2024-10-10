import {Web3} from "web3";
const web3  = new Web3("https://sepolia.base.org")

async function test() {
    try {
        const chainID = await web3.eth.getChainId();
        console.log("Chain ID is ", chainID);
    } catch(err) {
        console.log("Error Testing =>", err);
    }
}

test()