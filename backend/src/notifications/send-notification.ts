import Expo, { ExpoPushMessage } from "expo-server-sdk";
import expo from "./client";
import isExpoTokenValid from "./isExpoTokenValid";

export async function sendNotification(args: {title: string, pushToken: string, body: string, data: Record<string, any>}[]) {
    try {
        let messages: ExpoPushMessage[] = [];
        for (let arg of args) {
            if(!isExpoTokenValid(arg.pushToken)) {
                throw "Invalid Expo Push Token";
            }
            messages.push({
                to: arg.pushToken,
                sound: 'default',
                priority: 'high',
                title: arg.title,
                body: arg.body,
                data: arg.data, 
            });
        }

        let chunks = expo.chunkPushNotifications(messages);
        (async () => {
            for (let chunk of chunks) {
                try {
                    let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
                    console.log("Notification Sent");
                } catch (error) {
                    console.error("Error Sending Notifications", error);
                    throw "Could Not Send Notification";
                }
            }
        })();

    } catch(err) {
        console.log("Error Sending Notification", err);
        if(typeof err === 'string') {
            throw err;
        } else {
            throw "Error Sending Notification";
        }
    }
}