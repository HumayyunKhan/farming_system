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
router.route("/getproduct").get(Auth,VendorAuth,getproduct);
router.route("/deleteproduct/:productId").delete(Auth,VendorAuth,deleteproduct);
 
//ContactUs Routes
router.route("/postcontactus").post(postcontactus);
router.route("/getcontactus").get(getcontactus);
router.route("/deletecontactus/:queryId").delete(deletecontactus);

//Orders Routes
router.route("/addtocart/:productid/:userid").post(addtocart);
router.route("/getCartItems/:userid").get(getCartItems); 
router.route("/removeFromCart/:productid/:userid").delete(removeFromCart);
router.route("/postorder").post(postorder);
router.route("/getorder").get(getorder);
router.route("/deleteorder/:orderId").delete(deleteorder); 
router.route("/getCartItemsSingle/:productid/:userid").get(getCartItemsSingle);
router.route("/filterbycategory/:filter").get(filterbycategory);



module.exports = router;
