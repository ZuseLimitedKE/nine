import {Expo} from "expo-server-sdk";
import "dotenv/config";

const expo = new Expo({
    accessToken: process.env.EXPO_ACCESS_TOKEN,
    useFcmV1: true
})
export default expo;