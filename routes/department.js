const express = require("express");
const router = express.Router();
const Department = require("../Models/Department");

// CREATE DEPARTMENT
router.post("/department/create", async (req, res) => {
  try {
    const newDepartment = new Department({
      title: req.fields.title
    });
    await newDepartment.save();
    res.json({ message: "Nouveau Department Crée" });
  } catch (error) {
    res.json({ message: error.message });
  }
});

// READ DEPARTMENT
router.get("/department", async (req, res) => {
  try {
    const departments = await Department.find();
    res.json(departments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
// UPDATE DEPARTMENT
router.post("/department/update/:id", async (req, res) => {
  try {
    const departmentToUpdate = await Department.findById(req.params.id);
    departmentToUpdate.title = req.fields.title;
    await departmentToUpdate.save();
    res.json(departmentToUpdate);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE DEPARTMENT

module.exports = router;
