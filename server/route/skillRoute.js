import express from "express";
import Skill from "../modals/skill.modal.js";

const router = express.Router();

router.get("", async (req, res) => {
  const skills = await Skill.find().sort({ createdAt: -1 });
  res.json({skills,message: "Skills fetched successfully" });
});

router.post("", async (req, res) => {
  try {
    const { name, category } = req.body;

    // prevent duplicate skills
    const existing = await Skill.findOne({
      name: name.toLowerCase(),
    });

    if (existing) {
      return res.status(400).json({
        message: "Skill already exists",
      });
    }

    const newSkill = await Skill.create({
      name: name.toLowerCase(),
      category,
    });

    res.status(201).json({newSkill,message: "Skill created successfully"  });
  } catch (err) {
    res.status(500).json({ message: "Error creating skill" });
  }
});

export default router;
