import express from "express";
import { loginUser, registerUser } from "../controller/user.controller.js";
import { upload } from "../utils/upload.js";

const router = express.Router();

// Define route
router.post("/signup", upload.single("profilePic"), registerUser);
router.post("/login",  loginUser);

export default router;