import generatetoken from '../lib/token.js';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { User } from '../models/user.models.js';
import cloundinary from '../lib/cloudinary.js';
const signup = async (req, res) => {
    const { fullName, email, password } = req.body;
    try {
    if (!fullName || !email || !password) {
        return res.status(400).json({ message: "Please fill all the fields" });
    }

   
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        const user1 = await User.findOne({ email });
        if (user1) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedpassword = await bcrypt.hash(password, 10);
        const user = new User({ fullName, email, password: hashedpassword });

        if (user) {
            const token = await generatetoken(user._id, res);
            await user.save();
            return res.status(201).json({
                _id: user._id,
                fullName: user.fullName,
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
    try {
    // Validate input
    if (!email || !password) {
        return res.status(400).json({ message: "Please fill all the fields" });
    }

  
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

        const token =  generatetoken(user._id, res);

        return res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
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
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
      } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
      }
};

const updateProfile= async (req,res)=>{
   try {
    const {profilePic}  =req.body;
    if(!profilePic){
        return res.status(400).json({message:"Please select an image"});
    }
    const user_id = req.user._id
    const uploaderresponse =  await cloundinary.uploader.upload(profilePic);
    const updateuser = await User.findByIdAndUpdate(user_id,{profilePic:uploaderresponse.secure_url},{new:true});
    res.status(200).json(updateuser);

   } catch (error) {
         console.error(error);
         res.status(500).json({message:"Server error"});
   }

}
const checkauth = async (req,res)=>{
    
    try {
        res.status(200).json(req.user);
    } catch (error) {
        res.status(500).json({meassage:"not the correct auth"});
    }
}
const getprofile = async(req,res)=>{
    const profilePic =req.user.profilePic;
    if(!profilePic){
        res.status(500).json({meassage:"put file in it"});
    }
    res.json(profilePic);

}
export { login, logout, signup, updateProfile,checkauth ,getprofile};
