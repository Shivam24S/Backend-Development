import HttpError from "../middleware/HttpError.js";
import Products from "../model/ProductModel.js";

const addProduct = async (req, res, next) => {
  try {
    const { name, description, price, category } = req.body;

    if (!req.file) {
      next(new HttpError("image is required", 400));
    }

    const newProduct = await Products.create({
      name,
      description,
      price,
      category,
      productImage: req.file.path,
      cloudinary_Id: req.file.filename,
    });

    res.status(201).json({ message: "product added", newProduct });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

export default addProduct;
