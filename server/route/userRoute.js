import express from "express";
import {
  getUserProfile,
  loginUser,
  logoutUser,
  registerUser,
  updateUserProfile,
  updateUserProfilePic,
} from "../controller/user.controller.js";
import { upload } from "../utils/upload.js";
const router = express.Router();

// Define route
router.post("/signup",  registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/profile/:id", getUserProfile);
router.patch("/profile/:id", updateUserProfile);
router.post("/profile/upload-pic/:id", upload.single("profilePic"), updateUserProfilePic);


export default router;
