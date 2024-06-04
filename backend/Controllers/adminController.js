const Admin = require("../Models/adminModel"); // Imported the User Model
const asynchandler = require("express-async-handler"); // For Error Handling
const generateToken = require("../utils/generateToken");
const { ROLES } = require("../utils/roles");
const VendorModel = require("../Models/vendorModel");
const ProductModel = require("../Models/AdminModel/ProductModel");
const mongoose = require("mongoose");

const Register = asynchandler(async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await Admin.create({
      username,
      email,
      password,
    });

    if (user) {
      res.status(201).json({
        success: true,
        data: user,
        token: generateToken({
          id: user.id,
          role: ROLES.user,
          username: user.username,
        }),
      });
    } else {
      res.status(400);
      throw new Error("Error Occured!");
    }
  } catch (error) {
    console.log("erro in signup", error);
    if (error.keyPattern.username) {
      res.json({ usernamealreadyExist: true, success: true });
    }
    if (error.keyPattern.email) {
      res.json({ emailalreadyExist: true, success: true });
    }
  }
});

const Login = asynchandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await Admin.findOne({ email });
  console.log("user.matchPassword(password)", user.matchPassword(password));
  if (user && user.matchPassword(password)) {
    res.json({
      success: true,
      data: user,
      token: generateToken({
        id: user.id,
        role: ROLES.admin,
        username: user.username,
      }),
    });
  } else {
    res.status(400).json({ success: false });
  }
});

const getVendor = asynchandler(async (req, res) => {
  console.log(req.userId, "------------------");
  // const {self}=req.query;
  // const Vendors = await VendorModel.find({}).populate("products");
  const Vendors = await VendorModel.aggregate([
    {
      $lookup: {
        from: "products",
        localField: "_id",
        foreignField: "vendor",
        as: "products",
      },
    },
  ]);
  res.status(200).json(Vendors);
});

const deleteVendor = asynchandler(async (req, res) => {
  const VendorId = req.params.vendorId;
  try {
    const deletedVendor = await VendorModel.findOneAndDelete({ _id: VendorId });
    await ProductModel.findOneAndDelete({
      vendor: new mongoose.Types.ObjectId(VendorId),
    });
    if (!deletedVendor) {
      return res.status(404).json("Vendor not found");
    }
    res.status(200).json("Vendor deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal server error");
  }
});

module.exports = { Login, Register, getVendor, deleteVendor };
