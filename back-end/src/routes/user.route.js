import express from "express";
import { productRoute } from "../middleware/productRoute.js";
import { inncommingReqs } from "../controllers/actions/incommingRqs.js";
import { myConnections } from "../controllers/actions/myConnections.js";
import { myFeed } from "../controllers/actions/myFeed.js";

export const userRouter = express.Router();
userRouter.use(productRoute)

userRouter.get("/requests",inncommingReqs);
userRouter.get("/connections",myConnections);
userRouter.get("/feed",myFeed);