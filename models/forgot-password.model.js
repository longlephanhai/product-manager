const mongoose = require("mongoose")
const generate = require("../helpers/generate")
const forgotPasswordSchema = new mongoose.Schema({
  email: String,
  otp: String,
  expireAt: {
    type: Date,
    expires: 180
  }
}, {
  timestamps: true
});
const ForgotPassword = mongoose.model("forgotPassword", forgotPasswordSchema);

module.exports = ForgotPassword