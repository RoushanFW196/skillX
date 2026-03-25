import express from "express";
import {  findOrCreateSkill } from "../controller/skill.controller";

const router = express.Router();

// Define route
router.post("/add-skill", findOrCreateSkill);

export default router;