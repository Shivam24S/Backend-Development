import mongoose from "mongoose";

async function connectDB() {
  try {
    const connect = await mongoose.connect(
      "mongodb://127.0.0.1:27017/linkedin",
    );

    console.log("db connected");
  } catch (error) {
    throw new Error(error.message);
  }
}

export default connectDB;
