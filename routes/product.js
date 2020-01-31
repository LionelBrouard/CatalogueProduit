const express = require("express");
const router = express.Router();
const Product = require("../Models/Product");

// CREATE PRODUCT
router.post("/product/create", async (req, res) => {
  try {
    const newProduct = new Product({
      title: req.fields.title,
      description: req.fields.description,
      price: req.fields.price,
      category: req.fields.category
    });
    await newProduct.save();
    res.json({ message: "Nouveau Produit Crée" });
  } catch (error) {
    res.json({ message: error.message });
  }
});

// READ PRODUCT
router.get("/product", async (req, res) => {
  try {
    const products = await Product.find().populate("category");
    res.json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
// UPDATE PRODUCT
router.post("/product/update/:id", async (req, res) => {
  try {
    const productToUpdate = await Product.findById(req.params.id);
    productToUpdate.title = req.fields.title;
    productToUpdate.description = req.fields.description;
    productToUpdate.price = req.fields.price;
    await productToUpdate.save();
    // console.log(productToUpdate);
    res.json(productToUpdate);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
// DELETE PRODUCT

module.exports = router;
