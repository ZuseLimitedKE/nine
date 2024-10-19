import Express from "express";
import cors from "cors";
import "dotenv/config";
import { CreateRequestParams, createRequestSchema } from "./types";
import { storeData } from "./ipfs/store";
import { createRequestOnBlockchain } from "./create-request";
import db, {users, eq, cidEvents, paymentEvents} from "./db/src";
import { sendNotification } from "./notifications/send-notification";
import { readFromIPFS } from "./ipfs/read";

const app = Express();
app.use("/", cors({ origin: '*' }), Express.json())

//@ts-ignore
app.post("/initAccount", async(req, res) => {
    try {
        const {address, expoToken} = req.body;

        // Update DB with details
        await db.insert(users).values({address, expoToken});
        return res.status(201).json({message: "User Account Created"});
    } catch(err) {
        console.log("Error Creating User Account");
        return res.status(500).json({error: "Error Creating User Account"});
    }
})

//@ts-ignore
app.post("/createRequest", async(req, res) => {
    try {
        let body = req.body;
        const parsed = createRequestSchema.safeParse(body);
        if(parsed.success) {
            // Create request on IPFS
            let requestID = await storeData(parsed.data);

            // Create request on blockchain
            console.log(parsed.data.requestInfo.payeeAddress, requestID)
            await createRequestOnBlockchain(parsed.data.requestInfo.payeeAddress, requestID);

            // Send user notification
            let userDetails = await db.select({
                token: users.expoToken
            }).from(users)
            //@ts-ignore
            .where(eq(users.address, parsed.data.requestInfo.payeeAddress));

            if (userDetails.length <= 0) {
                return res.status(400).json({message: "Payer Account Does Not Exist"});
            } 
            await sendNotification([{
                title: "You Have Received A Payment Request",
                pushToken: userDetails[0].token,
                body: `You have received a payment request of ${parsed.data.requestInfo.expectedAmount} wei`,
                data: parsed
            }]);
            return res.status(201).json({requestID});

        } else {
            console.log("Error Parsing Request Body");
            return res.status(400).json({error: parsed.error});
        }      
    } catch(err) {
        console.log("Issue creating request =>", err);
        return res.status(500).json({error: "Unable To Create Request"});
    }
});

interface UnPaidRequest {
    cid: string;
    payeeAddress: string;
    amount: number;
    timestamp: string;
}

interface PaymentRequest extends CreateRequestParams {
    cid: string
}

//@ts-ignore
app.get("/pending/:address", async(req, res) => {
    try {
        const address = req.params.address;

        // Get all requests for an address
        const requests = await db.select({
            address: cidEvents.payer_address,
            cid: cidEvents.cid,
            timestamp: cidEvents.timestamp
        }).from(cidEvents)
        .where(eq(cidEvents.payer_address, address));

        // Get requests that have been paid for already
        const paidRequets = await db.select({
            cid: paymentEvents.cid,
            payerAddress: paymentEvents.payer_address
        }).from(paymentEvents)
        .where(eq(paymentEvents.payer_address, address));

        // Get only events that are not paid for
        const unpaidEvents = requests.filter((r) => {
            for (let paid of paidRequets) {
                if (paid.cid == r.cid) {
                    return false;
                }
            }
            return true;
        })

        // Get amount and payee address of all unpaid requests
        let pendingRequests: UnPaidRequest[] = [];
        let promises: Promise<PaymentRequest | undefined>[] = [];
        
        async function getRequestDetails(cid: string): Promise<PaymentRequest | undefined> {
            try {
                const requestData = await readFromIPFS(cid);
                const parsedRequest = createRequestSchema.safeParse(requestData);
                if(parsedRequest.success) {
                    return {cid: cid, ...parsedRequest.data};
                } else {
                    console.log("Different data returned =>", requestData);
                    return undefined;
                }
            } catch(err) {
                console.log("Error getting request =>", err);
                return undefined;
            }
        }

        unpaidEvents.forEach((u) => promises.push(getRequestDetails(u.cid)));

        const data = await Promise.all(promises)
        data.forEach((d) => {
            if(d) {
                pendingRequests.push({
                    cid: d.cid,
                    payeeAddress: d.requestInfo.payeeAddress,
                    amount: d.requestInfo.expectedAmount,
                    timestamp: d.requestInfo.timestamp
                })
            }
        })
        return res.json(pendingRequests);
    } catch(err) {
        console.log("Error Getting Pending Requests => ", err);
        return res.status(500).json({message: "Errr Getting Pending Requests"});
    }
})

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server listening on port ${port}...`);
})