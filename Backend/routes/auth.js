const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const fetchUser = require("../middleware/fetchUser");
const { Vonage } = require('@vonage/server-sdk');
const OTP = require("../models/Otp");

// const client = require("twilio")(
//   process.env.ACCOUNT_SID,
//   process.env.AUTH_TOKEN
// );

const vonage = new Vonage({
    apiKey: process.env.VONAGE_API_KEY,
    apiSecret: process.env.VONAGE_API_SECRET
  });

// ROUTE 1: For Register a users
router.post(
  "/register",
  [
    body("name", "Please enter a name"),
    body("email", "Please enter a valid email").isEmail(),
    body("password", "Password must be atleast 8 characters"),
    body("mobile_number", "Please enter a valid mobile number").isLength({
      min: 10,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let user = await User.findOne({ mobile_number: req.body.mobile_number });
      if (user) {
        return res
          .status(400)
          .json({ error: "Please enter unique mobile number" });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        mobile_number: req.body.mobile_number,
        email: req.body.email,
        password: secPass,
      });

      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, process.env.JWT_SECRET_KEY);
      res.json({ status: 200, authToken });
    } catch (error) {
      console.log(error.message);
      res.status(500).json("Internal Server Error");
    }
  }
);

// ROUTE 2: For Login a user
router.post(
  "/login",
  [
    body("mobile_number", "Please enter a valid mobile number").isLength({
      min: 10,
    }),
    body("password", "Password can not be blank").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { mobile_number, password } = req.body;
    try {
      let user = await User.findOne({ mobile_number });
      if (!user) {
        return res
          .status(400)
          .json({ status: 400, error: "Invalid Credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ status: 400, error: "Invalid Credentials" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, process.env.JWT_SECRET_KEY);
      console.log(authToken);
      req.session.token=authToken;
      res.send({ status: 200, authToken });
    } catch (error) {
      console.log(error.message);
      res.status(500).json("Internal Server Error");
    }
  }
);

// ROUTE 3: For Get a user
router.get("/getuser", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send({ status: 200, user });
  } catch (error) {
    // console.log(error.message);
    res.send("Internal Server Error");
  }
});

// ROUTE 4: For Login a user with otp
// router.post(
//   "/otplogin",
//   [
//     body("mobile_number", "Please enter a valid mobile number").isLength({
//       min: 10,
//     }),
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const { mobile_number } = req.body;
//     try {
//       let user = await User.findOne({ mobile_number });
//       if (!user) {
//         return res
//           .status(400)
//           .json({ status: 401, error: "Mobile number is not registered" });
//       }

//       // send the otp for authorized mobile number
//       client.verify
//         .services(process.env.SERVICE_ID)
//         .verifications.create({
//           to: `+91${mobile_number}`,
//           channel: "sms",
//         })
//         .then((data) => {
//           res.status(200).json({ status: 200, data });
//         })
//         .catch((err) => {
//           console.log(err.message);
//           res
//             .status(400)
//             .json({ success: false, message: "error in send otp" });
//         });
//     } catch (error) {
//       console.log(error.message);
//       res.status(500).json("Internal Server Error");
//     }
//   }
// );
router.post("/otplogin", [
    body("mobile_number", "Please enter a valid mobile number").isLength({ min: 10 }),
  ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const { mobile_number } = req.body;
    try {
      console.log("Checking if user exists in the database...");
      let user = await User.findOne({ mobile_number });
      if (!user) {
        return res.status(400).json({ status: 401, error: "Mobile number is not registered" });
      }
  
      console.log("User found. Generating OTP...");
      // Generate OTP
      const otp = Math.floor(1000 + Math.random() * 9000).toString();
      console.log("Generated OTP:", otp);
  
      console.log("Storing OTP in the database...");
      // Store OTP in database with expiration time
    //   const otp = new OTP({

    //   })
      await OTP.create({
        mobile_number,
        otp,
      });
  
      const from = "YourAppName";
      const to = `+91${mobile_number}`;
      const text = `Your OTP is ${otp}`;
  
      console.log("Sending OTP via SMS...");
      vonage.sms.send({
        to: to,
        from: from,
        text: text
      }, (err, responseData) => {
        if (err) {
          console.log("Error sending OTP:", err);
          res.status(500).json({ status: 500, error: "Failed to send OTP" });
        } else {
          console.log("OTP sent successfully:", responseData);
          res.status(200).json({ status: 200, message: "OTP sent successfully" });
        }
      });
    } catch (error) {
      console.log("Server error:", error.message);
      res.status(500).json("Internal Server Error");
    }
  });


// Route 5: For otp verification
// router.post(
//   "/otpverify",
//   [body("code", "Otp must be 4 digit").isLength({ min: 4, max: 4 })],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const { code } = req.body;
//     const { mobile_number } = req.query;
//     try {
//       let user = await User.findOne({ mobile_number });

//       // check that otp is verified or not
//       client.verify
//         .services(process.env.SERVICE_ID)
//         .verificationChecks.create({
//           to: `+91${mobile_number}`,
//           code: code,
//         })
//         .then((message) => {
//           // if status is not approved send invalid otp error
//           if (message.status !== "approved") {
//             return res
//               .status(400)
//               .json({ success: false, error: "Invalid otp" });
//           }

//           // if status is approved send the specific user authToken
//           const data = {
//             user: {
//               id: user.id,
//             },
//           };

//           const authToken = jwt.sign(data, process.env.JWT_SECRET_KEY);
//           res.json({ status: 200, authToken });
//         });
//     } catch (error) {
//       console.log(error.message);
//       res.status(500).json("Internal Server Error");
//     }
//   }
// );
router.post("/otpverify", [
    body("code", "OTP must be 4 digits").isLength({ min: 4, max: 4 }),
  ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const { code } = req.body;
    const { mobile_number } = req.query;
  
    try {
      // Find the OTP entry in the database
      const otpEntry = await OTP.findOne({ mobile_number, otp: code });
  
      if (!otpEntry) {
        return res.status(400).json({ success: false, error: "Invalid OTP" });
      }
  
      // If OTP is valid, find the user and generate auth token
      let user = await User.findOne({ mobile_number });
  
      const data = {
        user: {
          id: user.id,
        },
      };
  
      const authToken = jwt.sign(data, process.env.JWT_SECRET_KEY);
      res.json({ status: 200, authToken });
  
      // Optionally, delete the OTP entry after successful verification
      await OTP.deleteOne({ _id: otpEntry._id });
  
    } catch (error) {
      console.log(error.message);
      res.status(500).json("Internal Server Error");
    }
  });

// ROUTE 6: For Edit user details, Login required
router.put("/edituser", fetchUser, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user.id, req.body, {
      new: true,
    });
    res.status(200).json({ status: 200, user });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});
//.select("-password")

module.exports = router;
