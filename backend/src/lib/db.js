import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async () => {
    try{
        // console.log(process.env.MONGODB_URI);
        const connectioninstance = await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connected...");
        // await mongoose.connect(process.env.MONGODB_URI,{});
        // console.log("MongoDB connected...");
        console.log(`DB IS CONNECTED : ${connectioninstance.connection.host}`)
    }
    catch(error){
        console.error("Error connecting to MongoDB:", error.message);
        process.exit(1);
    }
}
export default connectDB;
