import jwt from "jsonwebtoken";
import {User} from "../models/user.models.js"

const protectroute = async (req,res,next) =>{
    try {
        const token = req.cookies.jwt;
        if(!token){
            return res.status(401).json({message:"Unauthorized token "})
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({message:"Unauthorized not matched token "})
        }
        const user= await User.findById(decoded.userid);
        if(!user){
            return res.status(401).json({message:"Unauthorized user"})
        }
        req.user = user;
        next();

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

export default protectroute;