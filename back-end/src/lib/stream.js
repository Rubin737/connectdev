import {StreamChat} from 'stream-chat'
import "dotenv/config"


const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

const streamClient = StreamChat.getInstance(apiKey,apiSecret);

export const upsertUserStream = async(userData)=>{
    try{
        await streamClient.upsertUsers([userData]);
        return userData
    }
    catch(err){
        console.log(`Can't create user in Stream : ${err.message}`)
    }
}
