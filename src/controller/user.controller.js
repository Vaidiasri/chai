import asyncHandler from "../utils/asyncHandler.js";
const registerUser=asyncHandler(async (req, res)=>{ // basic controller method
    res.status(200).json({
        message:"hello dia 😁"
    })
})
export default registerUser;