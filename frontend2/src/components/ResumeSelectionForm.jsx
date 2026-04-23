import { useState } from "react";
import "./ResumeSelectionForm.css";

export default function ResumeSelectionForm({ job, onContinue, onBack }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [error, setError] = useState("");

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/msword",
        "text/rtf",
        "application/rtf",
        "text/plain",
      ];

      if (!allowedTypes.includes(file.type)) {
        setError("Please upload a PDF, DOCX, RTF, or TXT file");
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        setError("File size should be less than 10MB");
        return;
      }

      setUploadedFile(file);
      setSelectedOption("upload");
      setError("");
    }
  };

  const validateAndSubmit = (e) => {
    e.preventDefault();

    if (!selectedOption) {
      setError("Please select an option");
      return;
    }

    if (selectedOption === "upload" && !uploadedFile) {
      setError("Please upload a file");
      return;
    }

    const submitData = {
      option: selectedOption,
      file: uploadedFile || null,
    };

    console.log("Resume selection submitted:", submitData);
    onContinue?.(submitData);
  };

  return (
    <div className="resume-selection-container">
      <div className="resume-form-section">
        {/* Job Header */}
        <div className="job-header">
          <button className="back-button" onClick={onBack}>
            ←
          </button>
          <div className="job-title-small">
            <h3>{job?.title || "Software Engineer Intern"}</h3>
            <p>{job?.companyName || "Aucillodots - Mohali, Punjab"}</p>
          </div>
          <div className="save-progress">
            <p>Save and close</p>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: "50%" }}></div>
            </div>
            <span className="progress-text">50%</span>
          </div>
        </div>

        {/* Main Title */}
        <h1 className="form-title">Add a CV for the employer</h1>

        {/* Error Message */}
        {error && <div className="error-banner">{error}</div>}

        <form onSubmit={validateAndSubmit} className="resume-form">
          {/* Build Resume Option */}
          <div
            className={`resume-option ${selectedOption === "build" ? "selected" : ""}`}
            onClick={() => {
              setSelectedOption("build");
              setError("");
            }}
          >
            <div className="option-header">
              <div className="option-icon">📋</div>
              <div className="option-content">
                <h2>Build an Indeed Resume</h2>
                <p>We'll guide you through it; there are only a few steps.</p>
              </div>
            </div>
            <span className="recommended-badge">Recommended</span>
          </div>

          {/* Upload Resume Option */}
          <div
            className={`resume-option ${selectedOption === "upload" ? "selected" : ""}`}
            onClick={() => {
              setError("");
              document.getElementById("fileInput").click();
            }}
          >
            <div className="option-header">
              <div className="option-icon">📁</div>
              <div className="option-content">
                <h2>Upload a resume</h2>
                <p>
                  Accepted file types are PDF (recommended), DOCX, RTF, or TXT.
                </p>
              </div>
            </div>
            <input
              type="file"
              id="fileInput"
              className="file-input"
              accept=".pdf,.docx,.doc,.rtf,.txt"
              onChange={handleFileUpload}
              style={{ display: "none" }}
            />
          </div>

          {/* Uploaded File Info */}
          {uploadedFile && (
            <div className="uploaded-file-info">
              <span className="file-icon">📄</span>
              <div className="file-details">
                <p className="file-name">{uploadedFile.name}</p>
                <p className="file-size">
                  {(uploadedFile.size / 1024).toFixed(2)} KB
                </p>
              </div>
              <button
                type="button"
                className="remove-file-btn"
                onClick={() => {
                  setUploadedFile(null);
                  setSelectedOption(null);
                }}
              >
                ×
              </button>
            </div>
          )}

          {/* Continue Button */}
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
