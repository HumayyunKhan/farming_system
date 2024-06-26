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
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vendor',
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
});

const ProductModel = mongoose.model(
  "Products",
  productSchema
);

module.exports = ProductModel;
