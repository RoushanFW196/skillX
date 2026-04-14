import mongoose from "mongoose";
const { Schema } = mongoose;

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true, // prevent duplicates
    },
    category: String,
  },
  { timestamps: true },
);

const Skill = mongoose.model("Skill", skillSchema);
export default Skill;
