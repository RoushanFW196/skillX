import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDB from "./db/db.js";
import userRoutes from "./route/userRoute.js";
const PORT = process.env.PORT || 3000;

const app = express();

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
