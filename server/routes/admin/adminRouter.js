const express = require("express");
const mongoose = require("mongoose");
const Product = require("../../models/productModel");
const router = express.Router();
// add new product

router.post("/admin/addnewproduct", async (req, res) => {
  console.log(req.body.data);
  const data = req.body.data;
  const product = new Product({
    mainCategory: data.chosenMainMenu,
    secondCategory: data.chosenSecondaryMenu,
    productName: data.productNameValue,
    description: data.productDescValue,
    price: data.productPriceValue,
    image: "images/product.png",
  });
  await product.save();
  res.send();
});

module.exports = router;
