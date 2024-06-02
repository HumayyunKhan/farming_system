const express = require("express");
const { Login, Register } = require("../Controllers/userController");
const {checkToken:Auth}=require("../middlewares/authentication")
const {postCategory,getCategories,deleteCategory} =require('../Controllers/Admin/CategoryController')
const { postproduct, getproduct, deleteproduct } = require('../Controllers/Admin/ProductController')
const { postcontactus, getcontactus, deletecontactus } = require('../Controllers/Admin/ContactUsController')
const {postorder,getorder,deleteorder, addtocart, getCartItems, removeFromCart, getCartItemsSingle, filterbycategory} = require('../Controllers/Admin/OrderController')
const { categoryUploadMiddleware, productUploadMiddleware } = require("../middlewares/ImageMiddleware");
const { VendorAuth } = require("../utils/guards");

const router = express.Router();

router.route("/login").post(Login);
router.route("/register").post(Register);


//Category Routes
router.route("/postcategory").post(Auth,VendorAuth, categoryUploadMiddleware,postCategory);
router.route("/getcategory").get(Auth,VendorAuth,getCategories);
router.route("/deletecategory/:categoryId").delete(Auth,VendorAuth,deleteCategory);
//Product Routes
router.route("/postproduct").post(Auth,VendorAuth,productUploadMiddleware,postproduct);
router.route("/getproduct").get(Auth,getproduct);
router.route("/deleteproduct/:productId").delete(Auth,VendorAuth,deleteproduct);
 
//ContactUs Routes
router.route("/postcontactus").post(Auth,postcontactus);
router.route("/getcontactus").get(Auth,getcontactus);
router.route("/deletecontactus/:queryId").delete(Auth,deletecontactus);

//Orders Routes
router.route("/addtocart/:productid/:userid").post(Auth,addtocart);
router.route("/getCartItems/:userid").get(Auth,getCartItems); 
router.route("/removeFromCart/:productid/:userid").delete(Auth,removeFromCart);
router.route("/postorder").post(Auth,postorder);
router.route("/getorder").get(Auth,getorder);
router.route("/deleteorder/:orderId").delete(Auth,deleteorder); 
router.route("/getCartItemsSingle/:productid/:userid").get(Auth,getCartItemsSingle);
router.route("/filterbycategory/:filter").get(Auth,filterbycategory);



module.exports = router;
