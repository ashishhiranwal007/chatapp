import mongoose from "mongoose";   

const messageschema = mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    text:{
        type:String
    },
    image:{
        type:String
    }
},{Timestamp:true})
export const Message = mongoose.model("Message",messageschema);