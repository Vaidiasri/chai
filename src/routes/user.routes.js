import { Router } from "express";
import registerUser from "../controller/user.controller.js";
const  router=Router()
// using multter for  file  uploading
import {upload} from "../middelware/multer.middleware.js"
router.route("/register").post(upload.fields[
    {
        name:"avatar",
        maxCount:1
    },
    {
        name:"coverImage",
        maxCount:1
    }
],registerUser)
export default router