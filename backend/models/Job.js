const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  companyName: { type: String, required: true },
  location: String,

  // 🔹 SALARY FILTER
  salaryMin: { type: Number },
  salaryMax: { type: Number },
  salary: Number,

  features: { type: Boolean, default: false },
  companyLink: String,

  jobDescription: String,

  // 🔹 JOB TYPE FILTER
  jobType: {
    type: String,
    enum: [
      "Full-Time",
      "Permanent",
      "Temporary",
      "Fresher",
      "Part-Time",
      "Internship",
    ],
    default: "Full-Time",
  },

  // ✅ LINK JOB TO EMPLOYER
  employerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employer",
    required: true,
  },

  companyAbout: String,
  responsibilities: String,
  requirements: String,
  skills: String,
  whatWeOffer: String,

  // 🔹 WORK MODE FILTER (Remote/Hybrid)
  workMode: {
    type: String,
    enum: ["Remote", "Hybrid"],
    default: "Hybrid",
  },

  // 🔹 DISTANCE FILTER (in km) - Exact, 5, 10, 15, 20, 25, 30, 35
  distance: {
    type: Number,
    enum: [0, 5, 10, 15, 20, 25, 30, 35],
  },

  // 🔹 SALARY PRESET (12000, 15000, 18000, 22500, 30000)
  salaryBand: {
    type: Number,
    enum: [12000, 15000, 18000, 22500, 30000],
  },

  // 🔹 JOB LANGUAGE
  jobLanguage: {
    type: String,
    enum: ["Hindi", "English"],
    default: "English",
  },

  // 🔹 OCCUPATION
  occupation: { type: String },

  // 🔹 EDUCATION LEVEL FILTER
  educationLevel: {
    type: String,
    enum: ["High School", "Diploma", "Graduate", "Postgraduate"],
  },

  // 🔹 LANGUAGE REQUIRED
  languageRequired: {
    type: String,
    enum: ["Hindi", "English", "Punjabi", "Kannada", "Odishi"],
  },

  // 🔹 DATE POSTED
  datePosted: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Job", jobSchema);
