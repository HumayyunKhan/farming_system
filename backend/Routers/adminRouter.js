const express = require("express");
const {checkToken:Auth}=require("../middlewares/authentication")
const {  } = require("../Controllers/vendorController");
const { getVendor, deleteVendor,Login, Register } = require("../Controllers/adminController");
const router = express.Router();

router.route("/login").post(Login);
router.route("/register").post(Register);


// //Category Routes
router.route("/deletevendors/:vendorId").delete(deleteVendor); 
router.route("/getvendors").get(getVendor);
// router.route("/deletecategory/:categoryId").delete(Auth,deleteCategory);
// //Product Routes
// router.route("/postproduct").post(productUploadMiddleware,postproduct);
// router.route("/getproduct").get(getproduct);
// router.route("/deleteproduct/:productId").delete(deleteproduct);

// //ContactUs Routes
// router.route("/postcontactus").post(postcontactus);
// router.route("/getcontactus").get(getcontactus);
// router.route("/deletecontactus/:queryId").delete(deletecontactus);

// //Orders Routes
// router.route("/addtocart/:productid/:userid").post(addtocart);
// router.route("/getCartItems/:userid").get(getCartItems); 
// router.route("/removeFromCart/:productid/:userid").delete(removeFromCart);
// router.route("/postorder").post(postorder);
// router.route("/getorder").get(getorder);
// router.route("/deleteorder/:orderId").delete(deleteorder); 
// router.route("/getCartItemsSingle/:productid/:userid").get(getCartItemsSingle);
// router.route("/filterbycategory/:filter").get(filterbycategory);



module.exports = router;
