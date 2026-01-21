const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authModel = require("../schema/auth.model");
require("dotenv").config();

const router = express.Router();
const SECRET_KEY = process.env.SECRETKEY;

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, email, type, password } = req.body;

    if (!name || !email || !type || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    const existingUser = await authModel.findOne({ email });
    if (existingUser) {
      return res.json({
        success: false,
        message: "Email already exists"
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await authModel.create({
      name,
      email,
      type,
      password: hashedPassword
    });

    res.json({
      success: true,
      message: "Account created successfully",
      user
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error
    });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await authModel.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "Invalid email or password"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({
        success: false,
        message: "Invalid email or password"
      });
    }

    const token = jwt.sign({ id: user._id }, SECRET_KEY, {
      expiresIn: "7d"
    });

    res.json({
      success: true,
      message: "Login successful",
      token,
      user
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error
    });
  }
});

module.exports = router;
