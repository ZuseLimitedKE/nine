import Express from "express";
import cors from "cors";
import "dotenv/config";
import { createRequestSchema } from "./types";
import { storeData } from "./ipfs/store";
import { createRequestOnBlockchain } from "./create-request";
import db, {users, eq} from "./db/src";
import { sendNotification } from "./notifications/send-notification";

const app = Express();
app.use("/", cors({ origin: '*' }), Express.json())

//@ts-ignore
app.post('/createRequest', async(req, res) => {
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
})

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server listening on port ${port}...`);
})