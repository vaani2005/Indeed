import { useState } from "react";
import "./LocationDetailsForm.css";

export default function LocationDetailsForm({ job, onContinue, onBack }) {
  const [formData, setFormData] = useState({
    country: "India",
    postalCode: "",
    city: "",
    streetAddress: "",
  });

  const [errors, setErrors] = useState({});
  const [showCountryModal, setShowCountryModal] = useState(false);

  const countries = [
    "India",
    "United States",
    "Canada",
    "United Kingdom",
    "Australia",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleCountryChange = (country) => {
    setFormData((prev) => ({
      ...prev,
      country: country,
    }));
    setShowCountryModal(false);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.postalCode.trim()) {
      newErrors.postalCode = "Postal code is required";
    }
    if (!formData.city.trim()) {
      newErrors.city = "City, State/Territory is required";
    }
    if (!formData.streetAddress.trim()) {
      newErrors.streetAddress = "Street address is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Location form submitted:", formData);
      onContinue?.(formData);
    }
  };

  return (
    <div className="location-details-container">
      <div className="location-form-section">
        <button className="back-button" onClick={onBack}>
          ←
        </button>

        <div className="save-progress">
          <p>Save and close</p>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: "38%" }}></div>
          </div>
          <span className="progress-text">38%</span>
        </div>

        <h1 className="form-title">
          Review your location details from your profile
        </h1>
        <p className="form-description">
          Sharing location helps connect you with relevant jobs and estimate
          your commute time. We'll save any changes to your profile.
        </p>

        <form onSubmit={handleSubmit} className="location-form">
          {/* Country Field */}
          <div className="form-group">
            <label>Country</label>
            <div className="country-selector">
              <span className="country-value">{formData.country}</span>
              <button
                type="button"
                className="change-btn"
                onClick={() => setShowCountryModal(true)}
              >
                Change
              </button>
            </div>

            {showCountryModal && (
              <div className="country-modal">
                <div className="country-modal-content">
                  <input
                    type="text"
                    placeholder="Search countries..."
                    className="country-search"
                  />
                  <div className="country-list">
                    {countries.map((country) => (
                      <button
                        key={country}
                        type="button"
                        className={`country-option ${
                          formData.country === country ? "selected" : ""
                        }`}
                        onClick={() => handleCountryChange(country)}
                      >
                        {country}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Postal Code */}
          <div className="form-group">
            <label htmlFor="postalCode">Postal code</label>
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleInputChange}
              className={errors.postalCode ? "error" : ""}
            />
            {errors.postalCode && (
              <span className="error-message">{errors.postalCode}</span>
            )}
          </div>

          {/* City/State/Territory */}
          <div className="form-group">
            <label htmlFor="city">City, State/Territory</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className={errors.city ? "error" : ""}
            />
            {errors.city && (
              <span className="error-message">{errors.city}</span>
            )}
          </div>

          {/* Street Address */}
          <div className="form-group">
            <label htmlFor="streetAddress">
              Street address
              <span className="not-shown-badge">Not shown to employers</span>
            </label>
            <input
              type="text"
              id="streetAddress"
              name="streetAddress"
              value={formData.streetAddress}
              onChange={handleInputChange}
              className={errors.streetAddress ? "error" : ""}
            />
            {errors.streetAddress && (
              <span className="error-message">{errors.streetAddress}</span>
            )}
          </div>

          {/* Continue Button */}
          <button type="submit" className="continue-btn">
            Continue
          </button>
        </form>
      </div>

      {/* Job Preview Section */}
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
