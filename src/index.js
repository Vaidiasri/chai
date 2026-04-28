//require("dotenv").config({path:"./env"})
import connection from "./db/db.js";
import  app from "./app.js"

import dotenv from "dotenv"
dotenv.config({
    path:"./env"
})

connection()
.then(()=>{
    app.listen(process.env.Port||8000,()=>{
        console.log(`Server is runing at:${process.env.Port}`)
    })
})
.catch((err)=>{
  console.log(err)
})