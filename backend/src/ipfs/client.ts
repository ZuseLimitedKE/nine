import "dotenv/config";
import {PinataSDK} from 'pinata';

const pinata = new PinataSDK({
    pinataJwt: process.env.PINARA_KEY,
    pinataGateway: process.env.PINATA_GATEWAY
});

export default pinata;