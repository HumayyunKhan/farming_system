const AsyncHandler = require("express-async-handler");
const ProductModel = require("../../Models/AdminModel/ProductModel");
const CategoryModel = require("../../Models/AdminModel/CategoryModel");
const config = require("../../config");

const postproduct = AsyncHandler(async (req, res) => {
    const { categoryName, productName, description, newPrice, oldPrice, quantity } = req.body;
    const { userId } = req;
    try {
        const existingCategory = await CategoryModel.findOne({ categoryName });
        if (!existingCategory) {
          return res.status(400).json("Category not found");
        }
        const existingProduct = await ProductModel.findOne({ productName,categoryName, vendor: userId });
        if (existingProduct) {
            return res.status(400).json("Product Already Exists");
        }
        const productImage = req.file.filename;

        await ProductModel.create({
            categoryName, productName,
            description, newPrice, oldPrice,
            quantity, productImage:config.baseImageUrl+productImage, vendor: userId,
            category:existingCategory._id
        });

        res.status(201).json("Successfully Added Product");
    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json("Error adding product");
    }
});

const getproduct = AsyncHandler(async (req, res) => {
    console.log(req.userId, "------------------")
    const {self}=req.query;
    const query={}
    if(self){
        query.vendor=req.userId
    }
    const products = await ProductModel.find({ });
    res.status(200).json(products);
});


const deleteproduct = AsyncHandler(async (req, res) => {
    const productId = req.params.productId;
    try {
        const deletedProduct = await ProductModel.findOneAndDelete(({ _id: productId }));
        if (!deletedProduct) {
            return res.status(404).json('Product not found');
        }
        res.status(200).json('Product deleted successfully');
    } catch (error) {
        console.error(error);
        res.status(500).json('Internal server error');
    }
});

module.exports = { postproduct, getproduct, deleteproduct };


