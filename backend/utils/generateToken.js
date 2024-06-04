const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET || "J7i6fUIhNq";
const generateToken = (data) => {
  console.log("data", data);
  console.log("secret", secret);
  const payload = data;
  console.log(secret);
  return jwt.sign(payload, secret, {
    // Corrected this line
    expiresIn: "30d",
  });
};

module.exports = generateToken;
