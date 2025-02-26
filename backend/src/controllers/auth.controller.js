import generatetoken from '../lib/token.js';
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
        const hashedpassword = await bcrypt.hash(password,10);
        const user = await User.create({fullname,email,password:hashedpassword});
        if(user){
            generatetoken(user._id,res);
            await user.save();
            return res.status(201).json({
                _id:user._id,
                fullname:user.fullname,
                email:user.email,
                token:generatetoken(user._id),
                profilepic:user.profilepic
            });
        }
        else{
            return res.status(500).json({message:"Failed to create user"});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Server error"});
    }
}

const login =()=>{
    console.log("Login route");
}

const logout =()=>{
    console.log("Logout route");
}
export { login, logout, signup };