import mongoose from "mongoose";   

const meassageschema = mongoose.Schema({
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
export const Meassage = mongoose.model("Message",meassageschema);