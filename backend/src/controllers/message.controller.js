import { User } from "../models/user.models.js";
import { Message } from "../models/message.models.js";
import cloudinary from "../lib/cloudinary.js";
export const getUserForSideBar = async (req, res) => {
  try {
    const loggedinUser = req.user._id;
    const filterUser = await User.find({ _id: { $ne: loggedinUser } }).select(
      "-password"
    );
    res.status(200).json(filteredUsers);
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
    const  senderid  = req.user._id;
    const { id: receiverId } = req.params;
    let imageUrl;
    if (image) {
      const uploadresponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadresponse.secure_url;
    }
    const newMessages = new Message({
        senderid,
        receiverId,
        text,
        image:imageUrl
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

