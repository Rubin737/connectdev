import express from "express";
import router from "./routes/auth.route.js";
import "dotenv/config";
import cookieParser from "cookie-parser";
import { connectDB } from "./lib/db.js";
import { connectRouter } from "./routes/connection.route.js";
import { userRouter } from "./routes/user.route.js";
import path from 'path'

import cors from "cors";
import { chatRouter } from "./routes/chat.route.js";

const __dirname = path.resolve()

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 5001;

app.use("/api/auth", router);
app.use("/api/request", connectRouter);
app.use("/api/getuser", userRouter);
app.use("/api/chat", chatRouter);


if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname,'../front-end/dist')))
  app.use("*",(req,res)=>{
    res.sendFile(path.join(__dirname,'../front-end/dist/index.html'))
  })
}

app.listen(5001);
connectDB();
