const mongoose = require("mongoose");
const bcrpt = require("bcryptjs");

const vendorSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  products:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Products' }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

vendorSchema.pre("save", async function(next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrpt.genSalt(10);
  this.password = await bcrpt.hash(this.password, salt);
});

vendorSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrpt.compare(enteredPassword, this.password);
};
const VendorModel = mongoose.model("Vendor", vendorSchema);

module.exports =  VendorModel;
