import { Category, Skill } from "../modals/skill.modal.js";

export const createSkill = async (req, res) => {
  try {
    const { name, categorySlug } = req.body;

    // find category using slug
    const category = await Category.findOne({ slug: categorySlug });

    if (!category) {
      return res.status(400).json({ message: "Invalid category" });
    }

    const skill = await Skill.create({
      name,
      slug: name.toLowerCase().replace(/\s+/g, "-"),
      category: category._id,
    });

    res.status(201).json(skill);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


export const getSkillsByCategory = async (req, res) => {
  try {
    const { slug } = req.query;

    const category = await Category.findOne({ slug });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const skills = await Skill.find({ category: category._id });

    res.json(skills);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};