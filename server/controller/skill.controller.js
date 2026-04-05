import Skill from "../modals/skill.modal.js";

export async function findOrCreateSkill(skillName) {
  // normalize
  const normalized = skillName?.trim().toLowerCase();

  // check if exists
  let skill = await Skill.findOne({ name: normalized });

  if (!skill) {
    skill = await Skill.create({ name: normalized });
  }

  return skill._id;
};

