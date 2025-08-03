export const user = async(req,res)=>{
    const user = req.user
    res.status(200).json({success:true,message:"Current User",data:user})
}