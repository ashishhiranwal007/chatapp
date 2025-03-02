import express from 'express';
import authroutes from "./routes/auth.routes.js"; 
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import dbconnect from './lib/db.js'
dotenv.config();
import mongoose from 'mongoose';
const app =express();
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authroutes);
const port = process.env.PORT ;
dbconnect().then((result) => {
    console.log("mongodb connection :"+result);
}).catch((err) => {
    console.log(err);
});

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})