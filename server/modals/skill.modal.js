import mongoose from "mongoose";
const { Schema } = mongoose;

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    icon: String, // optional (for UI)
  },
  { timestamps: true },
);

export const Category = mongoose.model("Category", categorySchema);

const skillSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      lowercase: true,
    },

    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true },
);

// prevent duplicate skill inside same category
skillSchema.index({ name: 1, category: 1 }, { unique: true });

export const Skill = mongoose.model("Skill", skillSchema);

const userSkillSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    skill: {
      type: Schema.Types.ObjectId,
      ref: "Skill",
      required: true,
    },

    role: {
      type: String,
      enum: ["teacher"],
      default: "teacher",
    },

    pricePerHour: {
      type: Number,
      required: true,
    },

    rating: {
      type: Number,
      default: 0,
    },

    totalSessions: {
      type: Number,
      default: 0,
    },

    bio: {
      type: String,
      maxLength: 500,
    },

    experienceYears: Number,

    // future booking support
    availability: [
      {
        day: String,
        slots: [String], // ["10:00", "11:00"]
      },
    ],
  },
  { timestamps: true },
);

// prevent duplicate entry (same user same skill)
userSkillSchema.index({ user: 1, skill: 1 }, { unique: true });

export const UserSkill = mongoose.model("UserSkill", userSkillSchema);

const bookingSchema = new Schema(
  {
    student: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    teacher: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    skill: {
      type: Schema.Types.ObjectId,
      ref: "Skill",
      required: true,
    },

    userSkill: {
      type: Schema.Types.ObjectId,
      ref: "UserSkill",
      required: true,
    },

    date: Date,
    time: String,

    duration: {
      type: Number, // in minutes
      default: 60,
    },

    price: Number,

    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true },
);

export const Booking = mongoose.model("Booking", bookingSchema);
