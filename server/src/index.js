import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import cookieParser from 'cookie-parser';
import { authRouter } from "./routes/auth.js";
import { imageRouter } from "./routes/imageRouter.js";


const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended : false}))





app.use('/auth' , authRouter)
app.use('/upload', imageRouter)

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
