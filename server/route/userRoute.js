import express from "express";
import {
  getUserProfile,
  loginUser,
  logoutUser,
  registerUser,
  updateUserProfile,
} from "../controller/user.controller.js";
import { upload } from "../utils/upload.js";
const router = express.Router();

// Define route
router.post("/signup", upload.single("profilePic"), registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/profile/:id", getUserProfile);
router.patch("/profile/:id", updateUserProfile);
export default router;
