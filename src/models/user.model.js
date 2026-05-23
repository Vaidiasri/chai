import  mongoose, { Schema } from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
const userSchema=new mongoose.Schema({
    userName:{
        type:String,
        require:true,
        unique:true,
        trim:true,
        index:true
    },
    email:{
        type:String,
        require:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    fullName:{
        type:String,
        require:true,
        trim:true
    },
    avatar:{
        type:String,
        require:true
    },
    coverImage:{
        type:true
    },
    watchHistory:[
        {
            type:mongoose.Schema.ObjectId,
            ref:"Video"
        }
    ],
    password:{
        type:String,
        require:true
    },
    refreshToken:{
        type:String,
        require:true
    }

},{
    timestamps:true
})
userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next()
    this.password=await bcrypt.hash(this.password,10)
    next()
})
// Custom method
userSchema.method.isPassword=async function(password){
    return await bcrypt.compare(password,this.password)
}
// token evaluation
userSchema.method.getAccessToken=function(){
    jwt.sign({
        // define  payload
        _id:this._id,
        email:this.email,
        username:this.userName,
        fullname:this.fullName
    },
    process.env.ACCESS_TOKEN,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXP
    }
)
}
userSchema.method.getRefreshToken=function(){
    jwt.sign({
        // define  payload
        _id:this._id,
    },
    process.env.REFRESH_TOKEN,
    {
        expiresIn:process.env.REFRESH_TOKEN_EXP
    }
)
}

export const User=mongoose.model("User",userSchema)