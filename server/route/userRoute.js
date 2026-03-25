import express from "express";
import { registerUser } from "../controller/user.controller.js";

const router = express.Router();

// Define route
router.post("/signup", registerUser);

export default router;