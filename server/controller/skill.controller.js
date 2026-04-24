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

export const getAllSkills = async (req, res) => {
  try {
    const skills = await Skill.find().populate("category", "name slug");
    res.status(200).json({ skills, message: "Skills retrieved successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getSkillsByCategory = async (req, res) => {
  try {
    const slug = req.query.category;
    const cat = await Category.findOne({ slug });
    if (!cat) {
      return res.status(404).json({ message: "Category not found" });
    }

    const skills = await Skill.aggregate([
      {
        $match: { category: cat._id },
      },
      {
        $lookup: {
          from: "userskills",
          localField: "_id",
          foreignField: "skill",
          as: "teachers",
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          categoryId: "$category",
          teacherCount: { $size: "$teachers" },
        },
      },
    ]);

    res.status(201).json({ skills, message: "Skills retrieved successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
