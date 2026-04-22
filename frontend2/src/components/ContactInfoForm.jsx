import { useState } from "react";
import "./ContactInfoForm.css";

export default function ContactInfoForm({ job, onClose }) {
  const [formData, setFormData] = useState({
    firstName: "Vaani",
    lastName: "Webguruz",
    email: "vaani@webguruz.in",
    phoneNumber: "77196-06619",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      newErrors.email = "Valid email is required";
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Form submitted:", formData);
      // Handle form submission
      alert("Application submitted successfully!");
      onClose?.();
    }
  };

  return (
    <div className="contact-info-container">
      <div className="contact-form-section">
        <div className="save-progress">
          <p>Save and close</p>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: "13%" }}></div>
          </div>
          <span className="progress-text">13%</span>
        </div>

        <h1 className="form-title">Add your contact information</h1>
        <p className="form-subtitle">
          Required fields are marked with an asterisk (*).
        </p>

        <form onSubmit={handleSubmit} className="contact-form">
          {/* First Name */}
          <div className="form-group">
            <label htmlFor="firstName">
              First name <span className="required">*</span>
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className={errors.firstName ? "error" : ""}
            />
            {errors.firstName && (
              <span className="error-message">{errors.firstName}</span>
            )}
          </div>

          {/* Last Name */}
          <div className="form-group">
            <label htmlFor="lastName">
              Last name <span className="required">*</span>
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className={errors.lastName ? "error" : ""}
            />
            {errors.lastName && (
              <span className="error-message">{errors.lastName}</span>
            )}
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div className="email-input-wrapper">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={errors.email ? "error" : ""}
              />
              <button
                type="button"
                className="info-icon"
                title="Your email address"
              >
                ⓘ
              </button>
            </div>
            {errors.email && (
              <span className="error-message">{errors.email}</span>
            )}
          </div>

          {/* Phone Number */}
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone number</label>
            <div className="phone-input-wrapper">
              <select className="country-code">
                <option value="+91">🇮🇳 +91</option>
                <option value="+1">🇺🇸 +1</option>
                <option value="+44">🇬🇧 +44</option>
              </select>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className={errors.phoneNumber ? "error" : ""}
              />
            </div>
            {errors.phoneNumber && (
              <span className="error-message">{errors.phoneNumber}</span>
            )}
          </div>

          {/* Submit Button */}
          <button type="submit" className="continue-btn">
            Continue
          </button>
        </form>

        {/* Help Section */}
        <div className="help-section">
          <p>
            Having an issue with this application?{" "}
            <a href="#help">Tell us more</a>
          </p>
          <p className="terms-text">
            This site is protected by reCAPTCHA and the Google{" "}
            <a href="#privacy">Privacy Policy</a> and{" "}
            <a href="#terms">Terms of Service</a> apply.
          </p>
        </div>
      </div>

      {/* Job Details Section */}
      {job && (
        <div className="job-preview-section">
          <h2 className="job-title">{job.title}</h2>
          <p className="job-company">{job.companyName}</p>

          <div className="job-about">
            <h3>About the role</h3>
            <p>{job.companyAbout || "Job details will appear here"}</p>
          </div>

          <div className="job-skills">
            <h3>Skills</h3>
            <ul>
              {job.skills ? (
                job.skills
                  .split(",")
                  .map((skill, index) => <li key={index}>{skill.trim()}</li>)
              ) : (
                <li>No specific skills listed</li>
              )}
            </ul>
          </div>

          <a href="#view-full" className="view-full-link">
            View full job description ▼
          </a>
        </div>
      )}
    </div>
  );
}
