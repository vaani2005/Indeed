const Employer = require("../models/Employer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const transporter = require("../config/mailer");

// ✅ CHECK USER
exports.checkUser = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email required" });
    }

    const employer = await Employer.findOne({ email });

    res.json({
      exists: !!employer && employer.isVerified,
      unverified: !!employer && !employer.isVerified,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ SEND OTP
exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    let employer = await Employer.findOne({ email });

    if (!employer) {
      employer = new Employer({ email, isVerified: false });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    employer.otp = otp;
    employer.otpExpiry = Date.now() + 5 * 60 * 1000;

    await employer.save();

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "OTP Verification",
      text: `Your OTP is ${otp}`,
    });

    res.json({ message: "OTP sent" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error sending OTP" });
  }
};

// ✅ VERIFY OTP
exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp, password } = req.body;

    const employer = await Employer.findOne({ email });

    if (!employer) {
      return res.status(400).json({ message: "Employer not found" });
    }

    if (employer.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (employer.otpExpiry < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    employer.password = await bcrypt.hash(password, 10);
    employer.isVerified = true;
    employer.otp = null;
    employer.otpExpiry = null;

    await employer.save();

    const token = jwt.sign({ id: employer._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ LOGIN
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const employer = await Employer.findOne({ email });

    if (!employer || !employer.isVerified) {
      return res.status(400).json({ message: "User not found" });
    }

    const match = await bcrypt.compare(password, employer.password);

    if (!match) {
      return res.status(400).json({ message: "Wrong password" });
    }

    const token = jwt.sign({ id: employer._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};
