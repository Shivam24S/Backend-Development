import multer from "multer";
import path from "path";

import HttpError from "./HttpError.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },

  filename: (req, file, cb) => {
    const uniqueName =
      file.fieldname + "-" + Date.now() + path.extname(file.originalname);

    cb(null, uniqueName);
  },
});

// file validation

const fileFilter = (req, file, cb) => {
  const allowedFile = [
    "image/jpg",
    "image/jpeg",
    "image/png",
    "image/heic",
    "application/pdf",
    "video/mp4",
  ];

  if (!allowedFile.includes(file.mimetype)) {
    return new HttpError("invalid file type", 400);
  }

  cb(null, true);
};

const uploads = multer({
  storage,
  fileFilter,
  limits: { fileSize: 20 * 1024 * 1024 },
});

export default uploads;
