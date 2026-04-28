//require("dotenv").config({path:"./env"})
import connection from "./db/db.js";
import dotenv from "dotenv"
dotenv.config({
    path:"./env"
})

connection()