const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchUser = require("../middleware/fetchUser");
const { Vonage } = require('@vonage/server-sdk');
const OTP = require("../models/Otp");
const validator = require('validator');
// Load environment variables from .env file
require('dotenv').config();

const vonage = new Vonage({
  apiKey: process.env.VONAGE_API_KEY,
  apiSecret: process.env.VONAGE_API_SECRET
});

// ROUTE 1: Register a user
router.post(
  "/register",
  [
    body("name", "Please enter a name").notEmpty(),
    body("email", "Please enter a valid email").isEmail(),
    body("password", "Password must be at least 8 characters").isLength({ min: 8 }),
    body("mobile_number", "Please enter a valid mobile number").isLength({ min: 10, max: 10 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, email, password, mobile_number } = req.body;
      let user = await User.findOne({ mobile_number });
      if (user) {
        return res.status(400).json({ error: "Mobile number already registered" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      user = new User({
        name,
        email,
        mobile_number,
        password: hashedPassword
      });

      await user.save();

      const data = { user: { id: user.id } };
      const authToken = jwt.sign(data, process.env.JWT_SECRET_KEY);

      res.json({ status: 200, authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// ROUTE 2: Login a user
// router.post(
//   "/login",
//   [
//     body("mobile_number", "Please enter a valid mobile number").isLength({ min: 10, max: 10 }),
//     body("password", "Password cannot be blank").exists()
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const { mobile_number, password } = req.body;
//     try {
//       let user = await User.findOne({ mobile_number });
//       if (!user) {
//         return res.status(400).json({ status: 400, error: "Invalid Credentials" });
//       }

//       const isMatch = await bcrypt.compare(password, user.password);
//       if (!isMatch) {
//         return res.status(400).json({ status: 400, error: "Invalid Credentials" });
//       }

//       const data = { user: { id: user.id } };
//       const authToken = jwt.sign(data, process.env.JWT_SECRET_KEY);

//       res.json({ status: 200, authToken });
//     } catch (error) {
//       console.error(error.message);
//       res.status(500).json({ error: "Internal Server Error" });
//     }
//   }
// );
// router.post(
//   "/login",
//   [
//     body("identifier", "Identifier cannot be blank").exists(),
//     body("password", "Password cannot be blank").exists()
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const { identifier, password } = req.body; // 'identifier' can be either mobile_number or email
//     try {
//       // Determine if the identifier is an email or mobile number
//       let query = {};
//       if (validator.isEmail(identifier)) {
//         query = { email: identifier };
//       } else {
//         query = { mobile_number: identifier };
//       }

//       let user = await User.findOne(query);
//       if (!user) {
//         return res.status(400).json({ status: 400, error: "Invalid Credentials" });
//       }

//       const isMatch = await bcrypt.compare(password, user.password);
//       if (!isMatch) {
//         return res.status(400).json({ status: 400, error: "Invalid Credentials" });
//       }

//       const data = { user: { id: user.id } };
//       const authToken = jwt.sign(data, process.env.JWT_SECRET_KEY, { expiresIn: '1h' }); // Set expiration as needed

//       res.json({ status: 200, authToken });
//     } catch (error) {
//       console.error(error.message);
//       res.status(500).json({ error: "Internal Server Error" });
//     }
//   }
// );
router.post(
  "/login",
  [
    body("identifier", "Identifier cannot be blank").exists(),
    body("password", "Password cannot be blank").exists()
  ],
  async (req, res) => {
    console.log('Request body:', req.body); // Log incoming request data

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors:', errors.array()); // Log validation errors
      return res.status(400).json({ errors: errors.array() });
    }

    const { identifier, password } = req.body;

    try {
      let query = {};
      if (validator.isEmail(identifier)) {
        query = { email: identifier };
      } else if (validator.isMobilePhone(identifier, 'any', { strictMode: false })) {
        query = { mobile_number: identifier };
      } else {
        return res.status(400).json({ error: 'Invalid identifier format' });
      }

      let user = await User.findOne(query);
      if (!user) {
        return res.status(400).json({ error: "Invalid Credentials" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: "Invalid Credentials" });
      }

      const data = { user: { id: user.id } };
      const authToken = jwt.sign(data, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

      res.json({ status: 200, authToken });
    } catch (error) {
      console.error('Server error:', error.message); // Log server errors
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);


// ROUTE 3: Get user profile
router.get("/getuser", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.json({ status: 200, user });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ROUTE 4: Request OTP for mobile login
router.post(
  "/otplogin",
  [
    body("mobile_number", "Please enter a valid mobile number").isLength({ min: 10, max: 10 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { mobile_number } = req.body;
    try {
      let user = await User.findOne({ mobile_number });
      if (!user) {
        return res.status(400).json({ status: 401, error: "Mobile number is not registered" });
      }

      const otp = Math.floor(1000 + Math.random() * 9000).toString();

      await OTP.create({
        mobile_number,
        otp,
        expiresAt: new Date(Date.now() + 15 * 60 * 1000) // OTP valid for 15 minutes
      });

      const from = "YourAppName";
      const to = `+91${mobile_number}`;
      const text = `Your OTP is ${otp}`;

      vonage.sms.send({ to, from, text }, (err, responseData) => {
        if (err) {
          console.error("Error sending OTP:", err);
          return res.status(500).json({ status: 500, error: "Failed to send OTP" });
        } else {
          console.log("OTP sent successfully:", responseData);
          res.json({ status: 200, message: "OTP sent successfully" });
        }
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// ROUTE 5: Verify OTP
router.post(
  "/otpverify",
  [
    body("code", "OTP must be 4 digits").isLength({ min: 4, max: 4 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { code } = req.body;
    const { mobile_number } = req.query;

    try {
      const otpEntry = await OTP.findOne({ mobile_number, otp: code, expiresAt: { $gt: new Date() } });
      if (!otpEntry) {
        return res.status(400).json({ success: false, error: "Invalid or expired OTP" });
      }

      let user = await User.findOne({ mobile_number });

      const data = { user: { id: user.id } };
      const authToken = jwt.sign(data, process.env.JWT_SECRET_KEY);

      res.json({ status: 200, authToken });

      await OTP.deleteOne({ _id: otpEntry._id });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// ROUTE 6: Edit user details
router.put("/edituser", fetchUser, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user.id, req.body, { new: true });
    res.json({ status: 200, user });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
