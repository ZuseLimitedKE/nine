import { Web3, WebSocketProvider } from "web3";
import fs from 'fs';
import { contract } from "web3/lib/commonjs/eth.exports";

const rawData = fs.readFileSync('./abi.json').toString();
const abi = JSON.parse(rawData)
// const web3 = new Web3("http://127.0.0.1:8545/")
const ABI = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "sender",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "cid",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
            }
        ],
        "name": "CidStored",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "payer",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "payee",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "cid",
                "type": "string"
            }
        ],
        "name": "PaymentMade",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address payable",
                "name": "payee",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "cid",
                "type": "string"
            }
        ],
        "name": "payForRequest",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "cid",
                "type": "string"
            }
        ],
        "name": "storeCid",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "stateMutability": "payable",
        "type": "receive"
    }
]

async function main() {
    try {
        const web3 = new Web3(
            new WebSocketProvider("wss://127.0.0.1:8545/")
        );
        const address = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
        const nineContract = new web3.eth.Contract(abi, address);
        const subscription = nineContract.events.CidStored();
        
        subscription.on('data', (d) => {
            console.log("Data Gotten =>", d)
        })
    } catch(err) {
        console.log("Error Running", err);
    }
}
main();