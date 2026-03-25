import mongoose from "mongoose";
import { LEVELS } from "../constant.js";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: String,
    email: { type: String, required: true, unique: true },
    phone: String,
    password: { type: String, required: true, select: false },
    yearsOfExperience: Number,
    authProvider: String,
    profilePic: String,
    skillsOffered: [
      {
        skill: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Skill",
          required: true,
        },
        level: {
          type: String,
          enum: LEVELS,
          required: true,
        },
      },
    ],
    skillsToLearn: [
      {
        skill: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Skill",
          required: true,
        },
        level: {
          type: String,
          enum: LEVELS,
          required: true,
        },
      },
    ],
    credits: { type: Number, default: 0 },
    ratingAvg: { type: Number, default: 0 },
    ratingCount: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

export default User;
