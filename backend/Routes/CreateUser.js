const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// JWT secret should be in an environment variable for better security
const jwtSecret = process.env.JWT_SECRET || "your-default-secret";

// Route to create a new user
router.post(
  "/createuser",
  body("email").isEmail(),
  body("name").isLength({ min: 5 }),
  body("password", "Password must be at least 5 characters long").isLength({
    min: 5,
  }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // Check if email already exists
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        return res
          .status(400)
          .json({ success: false, message: "Email already registered" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPassword = await bcrypt.hash(req.body.password, salt);

      // Create new user
      await User.create({
        name: req.body.name,
        password: secPassword,
        email: req.body.email,
        location: req.body.location // Ensure `location` is handled correctly if optional
      });

      return res.json({ success: true });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }
);

// Route to login a user
router.post(
  "/login",
  body("email").isEmail(),
  body("password", "Password must be at least 5 characters long").isLength({
    min: 5,
  }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let userData = await User.findOne({ email });
      if (!userData) {
        return res
          .status(400)
          .json({ success: false, error: "Invalid email or password" });
      }

      const isMatch = await bcrypt.compare(password, userData.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ success: false, error: "Invalid email or password" });
      }
      
      const data = {
        user: {
          id: userData.id
        }
      };

      const authToken = jwt.sign(data, jwtSecret, { expiresIn: '1h' }); // Added expiration for security
      return res.json({ success: true, authToken: authToken });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }
);

module.exports = router;
