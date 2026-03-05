import express from "express";

import uploads from "../middleware/upload.js";
import productsController from "../controller/ProductController.js";

const router = express.Router();

router.post("/add", uploads.single("image"), productsController.createProduct);

router.get("/allProducts", productsController.allProducts);

router.get("/:id", productsController.getProduct);

router.delete("/:id", productsController.deleteProduct);

router.patch(
  "/:id",
  uploads.single("image"),
  productsController.updateProductData,
);

export default router;
