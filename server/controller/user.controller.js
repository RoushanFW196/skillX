import User from "../modals/user.modal.js";
import bcrypt from "bcryptjs";
import { findOrCreateSkill } from "./skill.controller.js";
import { uploadToCloudinary } from "../utils/upload.js";
import { generateAccessToken, generateRefreshToken } from "../utils/token.js";

export const registerUser = async (req, res) => {
  try {
    // 1. Get data from request
    const {
      name,
      email,
      password,
      skillsOffered,
      skillsToLearn,
      yearsOfExperience,
      phone,
    } = req.body;

    // 2. Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 3. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    let profilePicUrl = null;

    // profile pic
    if (req?.file) {
      const result = await uploadToCloudinary(req.file);
      profilePicUrl = result.secure_url;
    }

    // 4. Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const formattedSkillsOffered = [];

    for (const skill of skillsOffered) {
      const skillId = await findOrCreateSkill(skill);

      formattedSkillsOffered.push({
        skill: skillId,
        level: skill?.level ?? "Beginner",
      });
    }

    const formattedskillsToLearn = [];

    for (const skill of skillsToLearn) {
      const skillId = await findOrCreateSkill(skill);
      formattedskillsToLearn.push({
        skill: skillId,
        level: skill?.level ?? "Beginner",
      });
    }

    // 5. Create new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      skillsOffered: formattedSkillsOffered,
      skillsToLearn: formattedskillsToLearn,
      yearsOfExperience,
      profilePic: profilePicUrl,
      phone,
    });

    const newUser = await user.save();
    console.log("New user created:", newUser);
    // 6. Send response (DO NOT send password)
    res.status(201).json({
      message: "User registered successfully",
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
  const user = await User.findById(req.user.id);
  user.refreshToken = null;
  await user.save();
  res.clearCookie("refreshToken");
  res.json({ message: "Logged out successfully" });
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
