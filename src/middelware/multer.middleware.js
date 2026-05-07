// src/middleware/multer.middleware.js

import multer from "multer";
import path from "path";

const storage = multer.diskStorage({

  // where file will store
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },

  // unique filename
  filename: function (req, file, cb) {

    const uniqueSuffix =
      Date.now() + "-" + Math.round(Math.random() * 1e9);

    const extension = path.extname(file.originalname);

    cb(null, uniqueSuffix + extension);
  },

});

export const upload = multer({
  storage,
});