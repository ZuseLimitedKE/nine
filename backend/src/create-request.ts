
import web3, {abi} from "./connection";
import "dotenv/config";

export async function createRequestOnBlockchain(payeeAddress: string, requestCID: string) {
    try {
        //@ts-ignore
        const contract = new web3.eth.Contract(abi, process.env.CONTRACT_ADDRESS);

        // Create request
        web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY ?? "");
        const txHash = await contract.methods.storeCid(payeeAddress, requestCID).send({
            from: "0xCb22808e75367f73Ae08C14300B54599EF2504eB",
            gas: '1000000',
            gasPrice: '10000000000'
        })
        console.log("Transaction Hash =>", txHash);
    } catch(err) {
        console.log("Error Creating Request => ", err);
        throw "Could Not Create Request"
    }
}