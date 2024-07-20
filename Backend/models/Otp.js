// models/OTP.js
const mongoose = require("mongoose");

const OTPSchema = new mongoose.Schema({
  mobile_number: {
    type: Number,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
    expires: '10m' // Automatically delete the document after 10 minutes
  }
});

const OTP = mongoose.model("otp", OTPSchema);
module.exports = OTP;
