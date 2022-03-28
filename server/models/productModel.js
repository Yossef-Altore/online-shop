const mongoose = require("mongoose");
const { Schema } = mongoose;
const productSchema = new Schema(
  {
    mainCategory: String,
    secondCategory: String,
    productName: String,
    description: String,
    image: String,
    price: Number,
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
