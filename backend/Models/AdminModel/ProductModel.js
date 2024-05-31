const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    categoryName: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
    unique:true
  },
  description:{
    type: String,
    required:true
  },
  newPrice: {
    type: String,
    required: true,
  },
  oldPrice: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
  productImage: {
    type: String,
    required: true,
  },
});

const ProductModel = mongoose.model(
  "Products",
  productSchema
);

module.exports = ProductModel;
