import express from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controller/user.controller.js";
import { upload } from "../utils/upload.js";
const router = express.Router();

// Define route
router.post("/signup", upload.single("profilePic"), registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

export default router;
