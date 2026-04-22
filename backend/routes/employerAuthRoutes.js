const express = require("express");
const router = express.Router();

const {
  checkUser,
  sendOTP,
  verifyOTP,
  loginUser,
} = require("../controllers/employerAuthController");

router.post("/check-user", checkUser);
router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOTP);
router.post("/login", loginUser);

module.exports = router;
