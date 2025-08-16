import express from "express";
import { productRoute } from "../middleware/productRoute.js";
import { getStreamToken } from "../controllers/actions/getStreamToken.js";

export const chatRouter = express.Router();
chatRouter.get("/token",productRoute,getStreamToken)