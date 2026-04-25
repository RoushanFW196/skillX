import express from "express";
import { Skill } from "../modals/skill.modal.js";
import {
  createSkill,
  getSkillsByCategory,
  getAllSkills,
  getUsersForSkill
} from "../controller/skill.controller.js";

const router = express.Router();
router.get("/", getSkillsByCategory);

router.get("/all", getAllSkills);
router.get("/:skillid/users", getUsersForSkill);

router.post("/new-skill", createSkill);

export default router;
