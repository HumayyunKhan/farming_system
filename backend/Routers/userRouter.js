const express = require("express");
const { Login, Register } = require("../Controllers/userController");
const { checkToken: Auth } = require("../middlewares/authentication");
const {
  postCategory,
  getCategories,
  deleteCategory,
} = require("../Controllers/Admin/CategoryController");
const {
  postproduct,
  getproduct,
  deleteproduct,
} = require("../Controllers/Admin/ProductController");
const {
  postcontactus,
  getcontactus,
  deletecontactus,
} = require("../Controllers/Admin/ContactUsController");
const {
  postorder,
  getorder,
  deleteorder,
  addtocart,
  getCartItems,
  removeFromCart,
  getCartItemsSingle,
  filterbycategory,
  addtocartByUser,
} = require("../Controllers/Admin/OrderController");
const {
  categoryUploadMiddleware,
  productUploadMiddleware,
} = require("../middlewares/ImageMiddleware");
const { BothAuth } = require("../utils/guards");

const router = express.Router();

router.route("/login").post(Login);
router.route("/register").post(Register);

//Category Routes
router
  .route("/postcategory")
  .post(Auth, BothAuth, categoryUploadMiddleware, postCategory);
router.route("/getcategory").get(getCategories);
router
  .route("/deletecategory/:categoryId")
  .delete(Auth, BothAuth, deleteCategory);
//Product Routes
router
  .route("/postproduct")
  .post(Auth, BothAuth, productUploadMiddleware, postproduct);
router.route("/getproduct").get(getproduct);

router.route("/deleteproduct/:productId").delete(deleteproduct);

//ContactUs Routes
router.route("/postcontactus").post(Auth, postcontactus);
router.route("/getcontactus").get(Auth, getcontactus);
router.route("/deletecontactus/:queryId").delete(Auth, deletecontactus);

//Orders Routes
router.route("/addtocart/:productid/:userid").post(Auth, addtocart);
router.route("/getCartItems/:userid").get(Auth, getCartItems);
router.route("/removeFromCart/:productid/:userid").delete(Auth, removeFromCart);
router.route("/postorder").post(Auth, postorder);
router.route("/getorder").get(Auth, BothAuth,getorder);
router.route("/deleteorder/:orderId").delete(Auth, deleteorder);
router
  .route("/getCartItemsSingle/:productid/:userid")
  .get(Auth, getCartItemsSingle);
router.route("/filterbycategory/:filter").get(filterbycategory);
router.route("/addtocart/:productid/").post(Auth, addtocartByUser);
router.route("/getCartItems").get(Auth, getCartItems);
router.route("/removeFromCart/:productid").delete(Auth, removeFromCart);
router.route("/getCartItemsSingle/:productid").get(Auth, getCartItemsSingle);

module.exports = router;
