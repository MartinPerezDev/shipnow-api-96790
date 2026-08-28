import multer from "multer";
import { createError } from "../utils/apiResponse.js";
import path from "path";
import crypto from "crypto";

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "uploads/documents");
  },
  filename: (req, file, callback) => {
    const extension = path.extname(file.originalname);
    const fileName = `${crypto.randomUUID()}${extension}`;

    callback(null, fileName);
  }
})

const fileFilter = (req, file, callback) => {
  if(file.mimetype === "application/pdf"){
    return callback(null, true);
  }

  callback( createError("INVALID_FILE_TYPE") );
}

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024
  }
});

export default upload;