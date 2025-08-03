import 'dotenv/config'

export const logout = (req,res)=>{
    res.clearCookie('myCookie',{
        httpOnly:true,
        sameSite:'strict',
        secure:process.env.NODE_ENV === 'production'
    });
    res.status(200).json({
        message:`Logout successfully!`
    })
}