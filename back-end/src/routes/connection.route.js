import express from 'express';
import { productRoute } from '../middleware/productRoute.js';
import { sendRequest } from '../controllers/actions/sendRequest.js';
import { reviewRequest } from '../controllers/actions/reviewRequest.js';



export const connectRouter = express.Router();
connectRouter.use(productRoute)

connectRouter.post("/send/:status/:id",sendRequest);
connectRouter.patch("/review/:status/:id",reviewRequest);
 