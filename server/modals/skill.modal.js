import mongoose from "mongoose";
const { Schema } = mongoose;
const skill = new Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true },
);

const Skill = mongoose.model("Skill", skill);
export default Skill;
