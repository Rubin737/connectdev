import express from "express";
import router from "./routes/auth.route.js";
import "dotenv/config";
import cookieParser from "cookie-parser";
import { connectDB } from "./lib/db.js";
import { connectRouter } from "./routes/connection.route.js";
import { userRouter } from "./routes/user.route.js";
import cors from 'cors'


const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials:true,
  })
);
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 5001;

app.use("/api/auth", router);
app.use("/api/request", connectRouter);
app.use("/api/getuser", userRouter);

app.listen(5001, () => console.log(`server running on ${PORT}`));
connectDB();
