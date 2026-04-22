const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");
const employerAuthRoutes = require("./routes/employerAuthRoutes");
const employerRoutes = require("./routes/employerRoutes");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api", jobRoutes);
app.use("/api/employer-auth", employerAuthRoutes);
app.use("/api/employer", employerRoutes);
// DB connect FIRST
connectDB();

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
