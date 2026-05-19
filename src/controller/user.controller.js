import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { User } from "../models/user.model.js";

const registerUser=asyncHandler(async (req, res)=>{ // basic controller method
    // res.status(200).json({
    //     message:"hello  😁"
    // })
    const  {userName,email,fullName,avatar,coverImage,password}=req.body
    console.log(`email : ${email}`)
    // validation 
    if(
        [fullName,email,userName,avatar,coverImage,password].some((filed)=>filed?.trim()=="")
        
    ){
        {
            throw new ApiError(400,"You miss some  required detail")
        }
    }
    // user already exist 
    const exist=User.find({
        $or:[{username},{email}]
    })
})
export default registerUser;