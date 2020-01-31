const express = require("express");
const app = express();
const formidableMiddleWare = require("express-formidable");
const mongoose = require("mongoose");
app.use(formidableMiddleWare());

mongoose.connect("mongodb://localhost/catalogueproduit", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const departmentRoutes = require("./routes/department");
app.use(departmentRoutes);
const categoryRoutes = require("./routes/category");
app.use(categoryRoutes);
const productRoutes = require("./routes/product");
app.use(productRoutes);

// Gestion des fausses routes
app.all("*", function(req, res) {
  res.json({ message: "All Routes" });
});

// Ecoute du server
app.listen(3000, () => {
  console.log("Serve has started");
});
