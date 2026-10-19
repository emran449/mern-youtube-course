const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

// register user
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({success: false, message: "User already exists" });
    }


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
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ success: false, message: "User does not exist" });
    }

    const isMatch = await bcryptjs.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: existingUser._id, email: existingUser.email, role: existingUser.role },
      'CLIENT_SECRET_KEY',
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {httpOnly: true, secure: false}).status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: existingUser._id,
        email: existingUser.email,
        role: existingUser.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// logout user

const logoutUser = (req, res) => {
  res.clearCookie("token").status(200).json({
    success: true,
    message: "Logout successful",
  });
};

// auth middleware

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ success: false, message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, 'CLIENT_SECRET_KEY');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "Invalid token." });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  authMiddleware,
};