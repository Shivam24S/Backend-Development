import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "e-commerce-multer-cloudinary",
    format: "webp",
    allowedFormats: ["jpg", "jpeg", "png"],
    transformation: [
      { height: 1000, width: 1000, crop: "limit" },
      { quality: "auto" },
    ],
  },
});

const uploads = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

export default uploads;
