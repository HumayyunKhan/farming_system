const AsyncHandler = require("express-async-handler");
const OrderModel = require('../../Models/AdminModel/OrderModel');
const UserModel = require("../../Models/userModel");
const ProductModel = require("../../Models/AdminModel/ProductModel");
const mongoose = require("mongoose");

const postorder = AsyncHandler(async (req, res) => {
    const { firstname, lastname, email, number, city, country, address, productname, description, quantity, price } = req.body;
    try {
        console.log("req.body;", req.body.price)
        const productExist=await ProductModel.findOne({productName:productname})        // const existingOrder = await OrderModel.findOne({ email });
        if (!productExist) {
            return res.status(400).json({ error: "Product no longer exist" }); // Return a JSON object with an error message
        }
        await OrderModel.create({
            firstname, lastname, email, number, city, country, address, productname, description, quantity, price,vendor:new mongoose.Types.ObjectId(productExist.vendor)
        });
        res.status(201).json("Successfully Added order");
    } catch (error) {
        console.error("Error adding order:", error);
        res.status(500).json("Error adding order");
    }
});

const getorder = AsyncHandler(async (req, res) => {
    const {userId}=req;
    const orders = await OrderModel.find({vendor:new mongoose.Types.ObjectId(userId)});
    res.status(200).json(orders);
}); 

const deleteorder = AsyncHandler(async (req, res) => {
    const orderId = req.params.orderId;
    try {
        const deletedorder = await OrderModel.findOneAndDelete(({ _id: orderId ,}));
        if (!deletedorder) {
            return res.status(404).json('order not found');
        }
        res.status(200).json('order deleted successfully');
    } catch (error) {
        console.error(error);
        res.status(500).json('Internal server error');
    }
});


const addtocartByUser = AsyncHandler(async (req, res) => {
    const productid = req.params.productid;
    const { userId } = req
    const {quantity}=req.body
    console.log("req", req.params)

    try {
        const product=await ProductModel.findOne({_id:productid});
        delete product.quantity;
        console.log(product,"---------")
        product["quantity"]=quantity
        console.log(product,"---------")
        if(!product){
          return  res.status(400).json('Product not found');
        }
        const addtocart = await UserModel.findOneAndUpdate({ _id: userId }, { $addToSet: { cart: productid,cartItems:{...product} } });
        res.json({ success: true })
    } catch (error) {
        console.error(error);
        res.status(500).json('Internal server error');
    }
});

const addtocart = AsyncHandler(async (req, res) => {
    const productid = req.params.productid;
    const userid = req.params.userid;
    console.log("req", req.params)

    try {
        const addtocart = await UserModel.findOneAndUpdate({ _id: userid }, { $addToSet: { cartItems: productid } });
        res.json({ success: true })
    } catch (error) {
        console.error(error);
        res.status(500).json('Internal server error');
    }
});


const getCartItems = AsyncHandler(async (req, res) => {
    let userid = req.params.userid;
    if (!userid) {
        userid = req.userId
    }
    console.log("req", userid)
    try {
        const getCartItems = await UserModel.findOne({ _id: userid })
        res.json({ success: true, data: getCartItems })
    } catch (error) {
        console.error(error);
        res.status(500).json('Internal server error');
    }
});


const removeFromCart = AsyncHandler(async (req, res) => {
    let userid = req.params.userid;
    if (!userid) {
        userid = req.userId
    }
    const productId = req.params.productid;
    console.log("asdf", req.params)
    try {
        // await UserModel.findOneAndUpdate(
        //     { _id: userid },
        //     { $pull: { cartItems: productId } },
        //     { new: true }
        // )
        const updatedUser = await UserModel.findOneAndUpdate(
            { _id: userid }, 
            { $pull: { cart: new mongoose.Types.ObjectId(productId),cartItems:{_id:new mongoose.Types.ObjectId(productId)} } },
            { new: true }
        );
        res.json({ success: true, data: getCartItems })
    } catch (error) {
        console.error(error);
        res.status(500).json('Internal server error');
    }
});



const getCartItemsSingle = AsyncHandler(async (req, res) => {
    let userid = req.params.userid;
    const productId = req.params.productid;
    console.log("getCartItemsSingle", req.params)
    if (!userid) {
        userid = req.userId
    }
    try {
        let data = await UserModel.findOne(
            { _id: userid },
            { cartItems: {_id:new mongoose.Types.ObjectId(productId)} },
        ).populate("cartItems")
        res.json({ success: true, data })
    } catch (error) {
        console.error(error);
        res.status(500).json('Internal server error');
    }
});


const filterbycategory = AsyncHandler(async (req, res) => {
    const filter = req.params.filter;
    console.log("filterbycategory", req.params)
    try {
        let data = await ProductModel.find(
            { categoryName: filter }
        )
        console.log("data", data)
        res.json({ success: true, data })
    } catch (error) {
        console.error(error);
        res.status(500).json('Internal server error');
    }
});

module.exports = { postorder, getorder, deleteorder, addtocart, getCartItems, removeFromCart, getCartItemsSingle, filterbycategory, addtocartByUser };
