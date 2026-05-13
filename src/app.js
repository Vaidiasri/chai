import  express from "express"
import  cors from "cors"
import cookieParser from "cookie-parser";
const app=express()
// cors configration
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))
app.use(express.json({limit:"16kb"}))// i am accpet  the data in json in express
app.use(express.urlencoded({extended:true,limit:"16kb"})) // i am accpet the data through url in express
app.use(express.static("public"))
// cookieparser in only use  when we want  to acess the  cookie  of users  and also want  to set  the  cookies too.
app.use(cookieParser())


// define import of router
import userRouter from "./routes/user.routes.js";
app.use("/api/v1/users",userRouter)


export default app;