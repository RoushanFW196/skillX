import User from "../modals/user.modal.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { findOrCreateSkill } from "./skill.controller.js";
import { uploadToCloudinary } from "../utils/upload.js";
import { generateAccessToken, generateRefreshToken } from "../utils/token.js";

export const registerUser = async (req, res) => {
  try {
    // 1. Get data from request
    const { name, email, password } = req.body;

    // 2. Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 3. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    /// will add skills and profile pic later
    // let profilePicUrl = null;

    // // profile pic
    // if (req?.file) {
    //   const result = await uploadToCloudinary(req.file);
    //   profilePicUrl = result.secure_url;
    // }

    // 4. Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 5. Create new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    const newUser = await user.save();
    console.log("New user created:", newUser);
    // 6. Send response (DO NOT send password)
    res.status(201).json({
      message: "User registered successfully",
      success: true,
      status: 200,
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    // OPTIONAL: store refresh token in DB
    user.refreshToken = refreshToken;
    await user.save();
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, // ❗ MUST be false on localhost
      sameSite: "lax", // ✅ important
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    res.status(200).json({
      message: "Login successful",
      success: true,
      status: 200,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        accessToken,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logoutUser = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;

    if (!token) {
      return res.status(200).json({
        message: "Already logged out",
      });
    }

    // ✅ Decode refresh token
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

    const user = await User.findById(decoded.id);

    if (user) {
      user.refreshToken = null;
      await user.save();
    }

    // ✅ Clear cookie (VERY IMPORTANT: same config)
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    return res.status(200).json({
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Logout error:", error);

    // ✅ Even if token invalid → clear cookie anyway
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    return res.status(200).json({
      message: "Logged out (fallback)",
    });
  }
};
export const refreshAccessToken = async (req, res) => {
  // new api called by frontend to get new access token using refresh token
  try {
    const token = req.cookies.refreshToken;

    if (!token) {
      return res.status(401).json({ message: "No refresh token" });
    }

    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

    const user = await User.findById(decoded.id);

    if (!user || user.refreshToken !== token) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const newAccessToken = generateAccessToken(user);

    res.json({ accessToken: newAccessToken });
  } catch (err) {
    res.status(403).json({ message: "Invalid or expired refresh token" });
  }
};
