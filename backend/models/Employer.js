// const mongoose = require("mongoose"); // ✅ MUST BE HERE

// const employerSchema = new mongoose.Schema({
//   email: { type: String, required: true, unique: true },
//   password: String,
//   otp: String,
//   otpExpiry: Date,
//   isVerified: { type: Boolean, default: false },

//   companyName: String,
//   firstName: String,
//   lastName: String,
//   phone: String,
// });

// module.exports = mongoose.model("Employer", employerSchema);

const mongoose = require("mongoose");

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

module.exports = mongoose.model("Employer", employerSchema);
