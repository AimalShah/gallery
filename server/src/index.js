import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import { authRouter } from "./routes/auth.js";
import cookieParser from 'cookie-parser';

const app = express();
app.use(cors())
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended : false}))

app.use('/auth' , authRouter)
app.get('/' , (req , res) => {
  res.json("Hello")
})

mongoose
  .connect(process.env.mongoDB)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Database connected and server running on PORT ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });
