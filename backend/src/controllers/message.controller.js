import { User } from "../models/user.models";
import {Message} from "../models/meassge.models.js"
const getUserForSideBar =async(req,res)=>{
    try {
        const loggedinUser = req.user._id;
        const filterUser = await User.find({_id:{$ne:loggedinUser}}).select("-password");
    } catch (error) {
        console.log("error :",error.message);
        res.status(500).json({message:"error in filtering the logged in user"});
    }
}
const getMessages = async(req,res)=>{
    try {
        const {id:friend_id} = req.params;
        const myid= req.user._id;
        const messages = await Message.find({
            $or:[
                {
                    senderId:myid,receiverId:friend_id
                },{
                    senderId:friend_id,receiverId:myid
                }
            ]
        })
        res.status(200).json(messages);
    } catch (error) {
        console.log("error :",error.message);
        res.status(500).json({
            message:"eroor in getting messages"
        });
    }
}