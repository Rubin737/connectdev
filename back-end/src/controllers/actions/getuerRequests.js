import { Connection } from "../../models/Connection.js";

export const userRequests = async(req,res)=>{
    const loggedUser = req.user;
    try {
        const connection = await Connection.find({
          sender: loggedUser._id,
          status: "interest",
        }).select(
          "fullName bio nativeLanguage learningLanguage location profilePic"
        );

        console.log(connection)
    
        res.status(200).json({success : "true",data:connection,message:"User Requests"})
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message:`Internal Error : ${error.message}`
        })
    }
} 