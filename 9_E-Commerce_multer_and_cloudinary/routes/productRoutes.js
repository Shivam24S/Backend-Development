import express from "express";

import uploads from "../middleware/uploads.js";
import addProduct from "../controller/productController.js";

const router = express.Router();

router.post("/add", uploads.single("image"), addProduct);

export default router;
