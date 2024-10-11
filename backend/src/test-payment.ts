import web3, {abi} from "./connection";
import "dotenv/config";

(async () => {
    try {
        console.log("TESTING REQUEST PAYMENT");
        //@ts-ignore
        const contract = new web3.eth.Contract(abi, process.env.CONTRACT_ADDRESS);

        web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY ?? "");
        const receiver = web3.eth.accounts.privateKeyToAccount(process.env.TEST_ACCOUNT_PRIVATE_KEY ?? "");


        const txHash = await contract.methods.payForRequest(receiver.address, 10, "Test CID").send({
            from: "0xCb22808e75367f73Ae08C14300B54599EF2504eB",
            gas: '1000000',
            value: '10',
            gasPrice: '10000000000'
        })
        console.log("Transaction Hash =>", txHash);

    } catch(err) {
        console.log("Error Test For Paying Request => ", err);
    }
})();