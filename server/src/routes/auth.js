import express from "express"
import { registerUser , loginUser , profile} from "../controllers/authController.js";
import cors from "cors"



const router = express.Router();

router.use(cors())

router.post('/register' , registerUser)
router.post('/login' , loginUser)
router.get('/profile' , profile)

export { router as authRouter}