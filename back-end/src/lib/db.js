import "dotenv/config";
import mongoose from "mongoose";
export const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.DB_URI);
    if (!connect) throw new Error(`Can't connect DB!`);
    console.log(`Connected to MongoDB!`);
  } catch (err) {
    console.log(`Error:` + err.message);
    process.exit(1);
  }
};
