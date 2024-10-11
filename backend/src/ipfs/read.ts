import pinata from "./client";
import _ from "lodash";
const {isNil} = _;

export async function readFromIPFS(cid: string): Promise<JSON> {
    try {
        const data = await pinata.gateways.get(cid);
        if(isNil(data.data)) {
            throw "Could Not Get Data";
        }
        if(typeof data.data! === 'string') {
            return JSON.parse(data.data!);
        } else if (data.data! instanceof Blob) {
            throw "Incompatible Data. Got File"
        }
        return data.data!;
    } catch(err) {
        console.log("Error Getting Data", err);
        if(typeof err === 'string') {
            throw err;
        } else {
            throw "Error Getting Data"
        }
    }
}