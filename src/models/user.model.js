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
    this.password=bcrypt.hash(this.password,10)
    next()
})
// Custom method
userSchema.method.isPassword=async function(password){
    return await bcrypt.compare(password,this.password)
}
export const User=mongoose.model("User",userSchema)