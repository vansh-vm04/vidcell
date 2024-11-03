"use server"
import { StreamClient } from "@stream-io/node-sdk";
import { currentUser } from "@clerk/nextjs/server";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiSecret = process.env.STREAM_SECRET_KEY;

export const tokenProvider=async ()=> {
    const user = await currentUser();

    if(!user) throw new Error("User is not logged in")
    if(!apiKey) throw new Error("Api key not found");
    if(!apiSecret) throw new Error("Api Secret not found");

    const client = new StreamClient(apiKey,apiSecret);
    const validity = 60 * 60;
    const token = client.generateUserToken({user_id:user.id,validity})
    return token;
}