// routes/employerRoutes.js

const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { saveEmployerInfo } = require("../controllers/employerController");

router.post("/save-info", protect, saveEmployerInfo);

module.exports = router;
