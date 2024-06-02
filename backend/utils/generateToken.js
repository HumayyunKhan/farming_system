const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const secret = process.env.JWT_SECRET;
const generateToken = (data) => {

console.log(data)
console.log(secret)
  return jwt.sign(data, secret, {
    expiresIn: "30d",
  });
};

module.exports = generateToken;
