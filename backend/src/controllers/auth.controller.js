import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../models/user.models.js';
const signup = async () =>{
    const {fullname,email,password}= req.body;
    try {
        if(password.length<6){
            return res.status(400).json({message:"Password must be atleast 6 characters"});
        }
        const user1 = await User.findOne(email);
        if(user1){
            return res.status(400).json({message:"User already exists"});
        }
        
        const user = await User.create({fullname,email,password});
    } catch (error) {
        
    }
}

const login =()=>{
    console.log("Login route");
}

const logout =()=>{
    console.log("Logout route");
}
export { login, logout, signup };