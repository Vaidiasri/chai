import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import uploadOnCloudinary from "../utils/Cloudnary.js"
import  ApiResponse from "../utils/ApiResponse.js"

const registerUser=asyncHandler(async (req, res)=>{ // basic controller method
    // res.status(200).json({
    //     message:"hello  😁"
    // })
    const  {userName,email,fullName,password}=req.body
    console.log(`email : ${email}`)
    // validation
    if(
        [fullName,email,userName,password].some((filed)=>filed?.trim()=="")

    ){
        {
            throw new ApiError(400,"You miss some  required detail")
        }
    }
    // user already exist
    const exist = await User.findOne({
        $or:[{userName},{email}]
    })
    if (exist){
        throw new ApiError(409,"User Already exist")
    }
    // avatar and coverImage check
    const avatar_Local_path=req.files?.avatar?.[0]?.path
    const cover_Image_local_path=req.files?.coverImage?.[0]?.path
    if(!avatar_Local_path){
        throw new ApiError(400,"Avatar file  is required")
    }
    const uploadAvtar=await uploadOnCloudinary(avatar_Local_path)
    const uploadCoverImage=await uploadOnCloudinary(cover_Image_local_path)
    if(!uploadAvtar){
        throw new ApiError(400,"Avatar upload failed")
    }
    // crate an object in database
    const  user=await User.create({
        fullName,
        avatar:uploadAvtar.secure_url,
        coverImage:uploadCoverImage?.secure_url || "",
        password,
        email,
        userName:userName.toLowerCase()

    })
  const createdUser= await  User.findById(user._id).select(
    "-password -refreshToken"
  )
  if(!createdUser){
    throw new ApiError(500,"There is an error in server side")
  }

  return res.status(201).json(
    new ApiResponse(201, createdUser, "User registered successfully")
  )

})
export default registerUser;