import express from "express"
import cors from "cors"
import multer from "multer"
import { imageUpload } from "../controllers/imageControler.js"

const router = express.Router();

router.use(cors({
    credentials : true ,
}))

const storage = multer.memoryStorage();
const upload = multer({storage})

router.post("/imageupload" , upload.single("image") , imageUpload)

export {router as imageRouter}
