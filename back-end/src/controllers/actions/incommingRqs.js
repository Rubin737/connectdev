import { Connection } from "../../models/Connection.js";

export const inncommingReqs = async(req,res)=>{

    const loggedUserId = req.user._id;

    try{

        const requests = await Connection.find({
          receipient: loggedUserId,
          status: "interest",
        }).populate(
          "sender",
          "fullName nativeLanguage learningLanguage profilePic"
        );

        if (!requests) {
          return res.status(404).json({
            success: false,
            message: "No connection requests",
          });
        }
    
        res.status(200).json({
            success:true,
            message:"Incomming request",
            data:requests
        })

    }catch(err){
        res.status(400).json({
            success:false,
            message:`Internal error : ${err.message}`
        })
    }

}