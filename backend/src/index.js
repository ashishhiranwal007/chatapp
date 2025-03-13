import express from 'express';
import authroutes from "./routes/auth.routes.js"; 
import meassageroutes from "./routes/message.routes.js";
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import dbconnect from './lib/db.js'
import cors from 'cors';

dotenv.config();
import mongoose from 'mongoose';

const app =express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, 
  })
);

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authroutes);
app.use("/api/meassage",meassageroutes);
const port = process.env.PORT ;
dbconnect().then((result) => {
    console.log("mongodb connection :"+result);
}).catch((err) => {
    console.log(err);
});

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})
