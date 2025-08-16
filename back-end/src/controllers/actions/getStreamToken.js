import { generateStreamToken } from "../../lib/stream.js"

export const getStreamToken = (req,res)=>{
    try{
        const token = generateStreamToken(req.user.id);
        res.status(201).json({success:true,message:"Token has been created",token})
    }
    catch(err){
        console.log("Cannot create a Stream Token",err.message)
    }
    
}