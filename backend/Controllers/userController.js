const User = require("../Models/userModel"); // Imported the User Model
const asynchandler = require("express-async-handler"); // For Error Handling
const generateToken = require("../utils/generateToken");
const { ROLES } = require("../utils/roles");

const Register = asynchandler(async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.create({
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

  console.log("req.body", req.body);
  const user = await User.findOne({ email });

  if (user && user.matchPassword(password)) {
    const token = generateToken({
      id: user.id,
      role: ROLES.user,
      username: user?.username,
    });
    res.json({
      success: true,
      data: user,
      token,
    });
  } else {
    res.status(400).json({ success: false });
  }
});

module.exports = { Login, Register };
