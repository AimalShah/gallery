import mongoose from "mongoose"


const imageSchema = new mongoose.Schema({
    imageName : {
        type : String , 
        require : true
    } , 
    imageURl : {
        type : String  
    } , 
    uploadUser : {
        type : mongoose.Schema.Types.ObjectId , ref : 'User'
    }
})

const Image = mongoose.model("Image" , imageSchema)

export default Image;