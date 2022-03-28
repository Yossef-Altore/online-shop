const express = require("express");
const mongoose = require("mongoose");
const Product = require("../../models/productModel");
const router = express.Router();

//get all supermarket products
router.get("/products", async (req, res) => {
  let products = await Product.find({});
  products = products.map((product) => {
    return { ...product };
  });
  res.send(products);
});

module.exports = router;
