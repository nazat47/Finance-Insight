const express = require("express");
const router = express.Router();
const Product = require("../models/productModel");
router.get("/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
});
module.exports = router;
