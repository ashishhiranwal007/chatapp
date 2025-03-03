import { User } from "../models/user.models.js";
import { Message } from "../models/message.models.js";
import { v2 as cloudinary } from "cloudinary";
export const getUserForSideBar = async (req, res) => {
  try {
    const loggedinUser = req.user._id;
    const filterUser = await User.find({ _id: { $ne: loggedinUser } }).select(
      "-password"
    );
  } catch (error) {
    console.log("error :", error.message);
    res.status(500).json({ message: "error in filtering the logged in user" });
  }
};
export const getMessages = async (req, res) => {
  try {
    const { id: friend_id } = req.params;
    const myid = req.user._id;
    const messages = await Message.find({
      $or: [
        {
          senderId: myid,
          receiverId: friend_id,
        },
        {
          senderId: friend_id,
          receiverId: myid,
        },
      ],
    });
    res.status(200).json(messages);
  } catch (error) {
    console.log("error :", error.message);
    res.status(500).json({
      message: "eroor in getting messages",
    });
  }
};

export const sendMessages = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: senderid } = req.user._id;
    const { receiverId } = req.params;
    let imageurl;
    if (image) {
      const uploadresponse = await cloudinary.uploader.upload(image);
      imageurl = uploadresponse.secure_url;
    }
    const newMessages = new Messages({
        senderid,
        receiverId,
        text,
        image:imageurl
    })
    await newMessages.save();
    res.status(201).json(newMessages)
  } catch (error) {
    console.log("error :", error.message);
    res.status(500).json({
      meassage: "internal server error",
    });
  }
};

