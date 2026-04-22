// src/utils/seedCategories.js

import { Category } from "../modals/skill.modal.js";

import { categories } from "../config/categories.js";

export const seedCategories = async () => {
  try {
    for (const cat of categories) {
      await Category.updateOne(
        { slug: cat.slug },
        { $set: cat },
        { upsert: true }
      );
    }
    console.log("✅ Categories seeded");
  } catch (err) {
    console.error("❌ Category seed error:", err.message);
  }
};