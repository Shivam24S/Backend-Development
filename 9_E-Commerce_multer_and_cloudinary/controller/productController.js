import HttpError from "../middleware/HttpError.js";
import Product from "../models/Product.js";
import cloudinary from "../config/cloudinary.js";

const createProduct = async (req, res, next) => {
  try {
    const { name, price, description, category } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const product = await Product.create({
      name,
      price,
      description,
      category,
      image: req.file.path,
      cloudinary_id: req.file.filename,
    });

    res.status(201).json(product);
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const allProducts = async (req, res, next) => {
  try {
    const products = await Product.find({});

    if (products.length === 0) {
      res.status(200).json({ message: "no product data found" });
    }

    res
      .status(200)
      .json({ message: "product data fetched successfully", products });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const getProduct = async (req, res, next) => {
  try {
    const id = req.params.id;

    const product = await Product.findById(id);

    if (!product) {
      return next(new HttpError("product not found", 404));
    }

    res.status(200).json({ success: true, product });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const id = req.params.id;

    const product = await Product.findById(id);

    if (!product) {
      return next(new HttpError("product not found", 404));
    }

    await cloudinary.uploader.destroy(product.cloudinary_id);

    await product.deleteOne();

    res
      .status(200)
      .json({ success: true, message: "product data deleted successfully" });
  } catch (error) {
    return next(new HttpError("product not found", 404));
  }
};

const updateProductData = async (req, res, next) => {
  try {
    const id = req.params.id;

    const product = await Product.findById(id);

    if (!product) {
      return next(new HttpError("product not found", 404));
    }

    const updates = Object.keys(req.body);

    const allowedUpdates = ["name", "price", "description", "category"];

    const isValidUpdates = updates.every((field) =>
      allowedUpdates.includes(field),
    );

    if (!isValidUpdates) {
      return next(new HttpError("only allowed field can be updated", 400));
    }

    updates.forEach((update) => {
      product[update] = req.body[update];
    });

    if (req.file) {
      await cloudinary.uploader.destroy(product.cloudinary_id);

      product.image = req.file.path;

      product.cloudinary_id = req.file.filename;
    }

    await product.save();

    res.status(200).json({ success: true, product });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

export default {
  createProduct,
  allProducts,
  getProduct,
  deleteProduct,
  updateProductData,
};
