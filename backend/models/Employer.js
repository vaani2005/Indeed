const mongoose = require("mongoose"); // ✅ MUST BE HERE

const employerSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: String,
  otp: String,
  otpExpiry: Date,
  isVerified: { type: Boolean, default: false },

  companyName: String,
  firstName: String,
  lastName: String,
  phone: String,
});

// ✅ THIS LINE IS CRITICAL
module.exports = mongoose.model("Employer", employerSchema);
