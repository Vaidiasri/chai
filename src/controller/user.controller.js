import asyncHandler from "../utils/asyncHandler.js";
const registerUser=asyncHandler(async (req, res)=>{ // basic controller method
    // res.status(200).json({
    //     message:"hello  😁"
    // })
    const  {userName,email,fullName,avatar,coverImage,password}=req.body
    console.log(`email : ${email}`)
})
export default registerUser;