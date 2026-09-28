const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

// register user
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashPassword = await bcryptjs.hash(password, 12);
    const newUser = new User({
      username,

      email,
      password: hashPassword,
    });

    await newUser.save();
    res.status(200).json({
      success: true,
      massage: "Registration successful",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// login user
const login = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// logout user

// auth middleware



module.exports = {
  registerUser,
};