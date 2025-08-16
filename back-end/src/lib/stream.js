import { StreamChat } from "stream-chat";
import "dotenv/config";

const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

const streamClient = StreamChat.getInstance(apiKey, apiSecret);

export const upsertUserStream = async (userData) => {
  try {
    await streamClient.upsertUsers([userData]);
    console.log("stream user created for :" , userData.fullName)
    return userData;
  } catch (err) {
    console.log(`Can't create user in Stream : ${err.message}`);
  }
};

export const generateStreamToken = (userId)=>{
    try{
      const userIdString = userId.toString();
      const token = streamClient.createToken(userIdString);
      return token
    }
    catch(err){
      console.log(err.message)
    }
}