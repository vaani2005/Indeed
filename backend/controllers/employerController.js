// controllers/employerController.js

const Employer = require("../models/Employer");

exports.saveEmployerInfo = async (req, res) => {
  try {
    const { companyName, firstName, lastName, phone } = req.body;

    const employer = await Employer.findByIdAndUpdate(
      req.user.id,
      { companyName, firstName, lastName, phone },
      { new: true },
    );

    res.json(employer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
