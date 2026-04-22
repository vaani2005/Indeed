const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const Job = require("../models/Job");

// 🔹 GET PUBLIC JOBS FOR SEEKERS WITH FILTERS
router.get("/jobs/all", async (req, res) => {
  try {
    const {
      salaryBand,
      workMode,
      distance,
      jobType,
      jobLanguage,
      skills,
      occupation,
      educationLevel,
      languageRequired,
      datePosted,
      keyword,
      location,
    } = req.query;

    let filter = {};

    // Search by keyword in title or company
    if (keyword) {
      filter.$or = [
        { title: { $regex: keyword, $options: "i" } },
        { companyName: { $regex: keyword, $options: "i" } },
      ];
    }

    // Search by location
    if (location) {
      filter.location = { $regex: location, $options: "i" };
    }

    // Filter by salary band (exact match from presets)
    if (salaryBand) {
      filter.salaryMin = { $gte: parseInt(salaryBand) };
    }

    // Filter by work mode (Remote/Hybrid)
    if (workMode) {
      filter.workMode = workMode;
    }

    // Filter by distance
    if (distance) {
      filter.distance = { $lte: parseInt(distance) };
    }

    // Filter by job type
    if (jobType) {
      filter.jobType = jobType;
    }

    // Filter by job language
    if (jobLanguage) {
      filter.jobLanguage = jobLanguage;
    }

    // Filter by skills
    if (skills) {
      filter.skills = { $regex: skills, $options: "i" };
    }

    // Filter by occupation
    if (occupation) {
      filter.occupation = { $regex: occupation, $options: "i" };
    }

    // Filter by education level
    if (educationLevel) {
      filter.educationLevel = educationLevel;
    }

    // Filter by language required
    if (languageRequired) {
      filter.languageRequired = languageRequired;
    }

    // Filter by date posted (last X days)
    if (datePosted) {
      const daysAgo = parseInt(datePosted);
      const date = new Date();
      date.setDate(date.getDate() - daysAgo);
      filter.datePosted = { $gte: date };
    }

    const jobs = await Job.find(filter).sort({ datePosted: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 🔹 GET JOBS (ONLY LOGGED-IN EMPLOYER)
router.get("/jobs", protect, async (req, res) => {
  try {
    const jobs = await Job.find({ employerId: req.user.id }); // ✅ FILTER
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 🔹 ADD JOB (LINK TO EMPLOYER)
router.post("/jobs", protect, async (req, res) => {
  try {
    const job = await Job.create({
      ...req.body,
      employerId: req.user.id,
    });

    res.json(job);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 🔹 DELETE JOB
router.delete("/jobs/:id", protect, async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: "Job deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
