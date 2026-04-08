import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./db/db.js";
import userRoutes from "./route/userRoute.js";
const PORT = process.env.PORT || 3000;

const app = express();

// Enable CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL, // your frontend URL
    credentials: true,
  }),
);

app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});
// Base route
app.use("/api/user", userRoutes);

console.log("Hello World!");

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
