import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const generatetoken = async (userid,res)=>{
    const token =jwt.sign({userid},process.env.JWT_SECRET,{
        expiresIn:'7d'
    })
    res.cookie("jwt",token,{
        maxAge:7*24*60*60*1000,
        httpOnly:true,
        secure:process.env.NODE_ENV!=="development",
        sameSite:'strict'
    })
    return token;
}

export default generatetoken;