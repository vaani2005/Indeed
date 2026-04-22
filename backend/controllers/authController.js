const Employer = require("../models/Employer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const transporter = require("../config/mailer");

// CHECK USER
exports.checkUser = async (req, res) => {
  const { email } = req.body;

  const user = await Employer.findOne({ email });

  res.json({
    exists: !!user && user.isVerified,
    unverified: !!user && !user.isVerified,
  });
};

// SEND OTP
exports.sendOTP = async (req, res) => {
  const { email } = req.body;

  let user = await Employer.findOne({ email });

  if (!user) user = new Employer({ email });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  user.otp = otp;
  user.otpExpiry = Date.now() + 5 * 60 * 1000;

  await user.save();

  await transporter.sendMail({
    to: email,
    subject: "OTP Verification",
    text: `Your OTP is ${otp}`,
  });

  res.json({ message: "OTP sent" });
};

// VERIFY OTP
exports.verifyOTP = async (req, res) => {
  const { email, otp, password } = req.body;

  const user = await Employer.findOne({ email });

  if (!user) return res.status(400).json({ message: "User not found" });

  if (user.otp !== otp) return res.status(400).json({ message: "Invalid OTP" });

  if (user.otpExpiry < Date.now())
    return res.status(400).json({ message: "OTP expired" });

  user.password = await bcrypt.hash(password, 10);
  user.isVerified = true;
  user.otp = null;
  user.otpExpiry = null;

  await user.save();

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.json({ token });
};

// LOGIN
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await Employer.findOne({ email });

  if (!user || !user.isVerified)
    return res.status(400).json({ message: "User not found" });

  const match = await bcrypt.compare(password, user.password);

  if (!match) return res.status(400).json({ message: "Wrong password" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.json({ token });
};
