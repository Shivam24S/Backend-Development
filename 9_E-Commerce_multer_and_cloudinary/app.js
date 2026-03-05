import dotenv from "dotenv";
import express from "express";

import connectDb from "./config/db.js";
import HttpError from "./middleware/HttpError.js";
import productRouter from "./router/productRouter.js";

dotenv.config({ path: "./.env" });

const app = express();

app.use(express.json());

app.use("/product", productRouter);

console.log(process.env.MONGO_URI);

app.get("/", (req, res) => {
  res.status(200).json("hello from server");
});

// undefined routes

app.use((req, res, next) => {
  next(new HttpError("requested route not found", 404));
});

app.use((error, req, res, next) => {
  if (res.headersSent) {
    next(error);
  }

  res
    .status(error.statusCode || 500)
    .json({ message: error.message || "internal server error" });
});

const port = 5000;

async function startServer() {
  try {
    await connectDb();
    app.listen(port, () => {
      console.log("server running on port", port);
    });
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
}

startServer();
