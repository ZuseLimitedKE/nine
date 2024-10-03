
import { Web3 } from "web3"
const web3 = new Web3("http://127.0.0.1:8545/")
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
const address = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
web3.eth.getBlockNumber().then(console.log);
const uniswapToken = new web3.eth.Contract(ABI, address);



async function storeCid() {
    const sender = web3.eth.accounts.wallet.add("0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e")
    const response = await uniswapToken.methods.storeCid("cid").send({ from: sender[0].address })
    console.log("Response", response.transactionHash);
}

storeCid()
