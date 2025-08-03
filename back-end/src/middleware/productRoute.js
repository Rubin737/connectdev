import jwt from 'jsonwebtoken'
import "dotenv/config"
import { User } from '../models/User.js';

export const productRoute = async(req,res,next)=>{
    
    const token = req.cookies.myCookie;
   
    if(!token) return res.status(401).send('Unauthorized-Request : Invalid Token');

    const checkToken = jwt.verify(token,process.env.JWT_SECRET_KEY);

    if(!checkToken) return res.status(401).send("Unauthorized-Request : Token is expired");
    
    const {userId} = checkToken;

    const user = await User.findOne({_id:userId});
    
    if(!user) return res.status(401).send("Unauthorized-Request : User is not exists");

    req.user = user;

    next()

}