import User from "../modals/user.modal.js";
import bcrypt from "bcryptjs";
import { findOrCreateSkill } from "./skill.controller.js";

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
      profilePic,
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
      profilePic,
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
