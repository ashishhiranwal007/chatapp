import generatetoken from '../lib/token.js';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { User } from '../models/user.models.js';
import cloundinary from '../lib/cloundianry.js';
const signup = async (req, res) => {
    const { fullname, email, password } = req.body;

    if (!fullname || !email || !password) {
        return res.status(400).json({ message: "Please fill all the fields" });
    }

    try {
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        const user1 = await User.findOne({ email });
        if (user1) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedpassword = await bcrypt.hash(password, 10);
        const user = await User.create({ fullname, email, password: hashedpassword });

        if (user) {
            const token = await generatetoken(user._id, res);
            await user.save();
            return res.status(201).json({
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
                token: token, // Use generated token
                profilepic: user.profilepic
            });
        } else {
            return res.status(500).json({ message: "Failed to create user" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        return res.status(400).json({ message: "Please fill all the fields" });
    }

    try {
        const user = await User.findOne({ email }); // ✅ Await added

        // Check if user exists
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if password exists (Extra safety check)
        if (!user.password) {
            return res.status(500).json({ message: "User password is missing in the database" });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password); // ✅ Await added

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = await generatetoken(user._id, res);

        return res.status(200).json({
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            token: token,
            profilepic: user.profilepic
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error" });
    }
};


const logout = (req, res) => {
    res.cookie("jwt","",{maxage:0})
    res.status(200).json({ message: "Logged out" });
};

const updateProfile= async (req,res)=>{
   try {
    const {profilepic}  =req.body;
    if(!profilepic){
        return res.status(400).json({message:"Please select an image"});
    }
    const user_id = req.user._id
    const uploaderresponse =  await cloundinary.uploader.upload(profilepic);
    const updateuser = await User.findByIdAndUpdate(user_id,{profilepic:uploaderresponse.url},{new:true});
    res.status(200).json(updateuser);

   } catch (error) {
         console.error(error);
         res.status(500).json({message:"Server error"});
   }

}
const checkauth = async (req,res)=>{
    
    try {
        res.json(req.user);

    } catch (error) {
        res.status(500).json({meassage:"not the correct auth"});
    }
}
const getprofile = async(req,res)=>{
    const profilepic =req.user.profilepic;
    if(!profilepic){
        res.status(500).json({meassage:"put file in it"});
    }
    res.json(profilepic);

}
export { login, logout, signup, updateProfile,checkauth ,getprofile};
