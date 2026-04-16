import mongoose from "mongoose";
import { LEVELS } from "../constant.js";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: String,
    email: { type: String, required: true, unique: true },
    phone: String,
    bio: String,
    password: { type: String, required: true, select: false },
    yearsOfExperience: Number,
    authProvider: String,
    profilePic: String,
    skillsOffered: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Skill",
      },
    ],
    skillsToLearn: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Skill",
      },
    ],
    credits: { type: Number, default: 100 },
    ratingAvg: { type: Number, default: 0 },
    ratingCount: { type: Number, default: 0 },
    refreshToken: { type: String }, // Store refresh token for security (optional)
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

export default User;
