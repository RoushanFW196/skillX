import mongoose from "mongoose";

const connectDB = async () => {
  console.log("Connecting to MongoDB...process.env.MONGO_URI");
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err.message);
    process.exit(1);
  }
};

export default connectDB;
