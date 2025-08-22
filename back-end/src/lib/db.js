import "dotenv/config";
import mongoose from "mongoose";
export const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.DB_URI);
    console.log("mongodb")
    if (!connect) throw new Error(`Can't connect DB!`);
  } catch (err) {
    console.log(err)
    process.exit(1);
  }
};
