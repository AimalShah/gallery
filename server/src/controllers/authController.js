import User from "../models/userModel.js";
import Image from "../models/imageModel.js";
import { hashPassword , comparePassword  } from "../helpres/authHelper.js";
import jwt from "jsonwebtoken"
import "dotenv/config"
import S3Service from "../service/s3Service.js";

const s3 = new S3Service(process.env.REGION , process.env.S3_ACCESS_KEY , process.env.S3_SECRET_KEY , process.env.S3_BUCKET_NAME)

const registerUser = async (req , res) => {
    try {
        const {name , email , password} = req.body;

        if(!name) {
            return res.json({error : "name is required"})
        }

        if(!password || password.length < 6) {
            return res.json({error : "password is required and should ba at least 6 characters long"})
        }

        const exist = await User.findOne({email})

        if(exist) {
            return res.json({error : "User on this email already exist"})
        }
        const hashedPassword = await hashPassword(password);

        const user = await User.create({name , email , password : hashedPassword})

        return res.json(user)

    } catch (err) {
        console.log(err)
    }
}

const loginUser = async (req , res) => {
    try{
        const {email , password} = req.body;

        const user = await User.findOne({email});

        if(!user) {
            return res.json({error : "User not found"});
        }

        const match = await comparePassword(password , user.password)

        if(match) {
            jwt.sign({email : user.email, id : user._id , name : user.name} , process.env.JWT_SECRET , {} , (err , token) => {
                if(err) throw err;
                res.json(token)
            })
        }

        if(!match) {
            res.json({error : "Password is incorrect"});
        }

    } catch (err) {
        console.log(err)
    }
}

const profile = async (req ,res) => {
    const token = req.query.localStorageData;

    if(!token){
        res.json({err : "Please Login" })
    }

    if(token) {
        const decoded = jwt.decode(token)
        const userData = await Image.find().populate('uploadUser' , 'name');
        for(let i = 0; i < userData.length; i++){
            const imageLink = await s3.getImageLinkByName(userData[i].imageName)
            userData[i].imageURl = imageLink;
        }
        const logedinUserData = userData.filter((user) => user.uploadUser.name === decoded.name);
        res.json({logedinUserData , decoded})
    }
}

export  {
    registerUser,
    loginUser,
    profile
}