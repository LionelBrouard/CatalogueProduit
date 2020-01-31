const express = require("express");
const router = express.Router();
const Category = require("../Models/Category");

// CREATE CATEGORY
router.post("/category/create", async (req, res) => {
  try {
    const newCategory = new Category({
      title: req.fields.title,
      description: req.fields.description,
      categorypartment: req.fields.department
    });
    console.log(newCategory);
    await newCategory.save();
    res.json({ message: "Nouvelle Categorie Crée" });
  } catch (error) {
    res.json({ message: error.message });
  }
});

// READ CATEGORY
router.get("/category", async (req, res) => {
  try {
    const categorys = await Category.find().populate("department");
    res.json(categorys);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
// UPDATE CATEGORY
router.post("/category/update/:id", async (req, res) => {
  try {
    const categoryToUpdate = await Category.findById(req.params.id);
    categoryToUpdate.title = req.fields.title;
    categoryToUpdate.description = req.fields.description;
    await categoryToUpdate.save();
    // console.log(categoryToUpdate);
    res.json(categoryToUpdate);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
// DELETE CATEGORY

module.exports = router;
