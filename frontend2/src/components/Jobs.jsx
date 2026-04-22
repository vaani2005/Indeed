import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./JobsFilters.css";

export default function Jobs() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [sortBy, setSortBy] = useState("relevance");
  const [filters, setFilters] = useState({
    keyword: "",
    location: "",
    salaryBand: "",
    workMode: "",
    distance: "",
    jobType: "",
    jobLanguage: "",
    skills: "",
    occupation: "",
    educationLevel: "",
    languageRequired: "",
    datePosted: "",
  });

  useEffect(() => {
    fetchJobs();
  }, [filters, sortBy]);

  const fetchJobs = async () => {
    try {
      const params = new URLSearchParams();

      if (filters.keyword) params.append("keyword", filters.keyword);
      if (filters.location) params.append("location", filters.location);
      if (filters.salaryBand) params.append("salaryBand", filters.salaryBand);
      if (filters.workMode) params.append("workMode", filters.workMode);
      if (filters.distance) params.append("distance", filters.distance);
      if (filters.jobType) params.append("jobType", filters.jobType);
      if (filters.jobLanguage)
        params.append("jobLanguage", filters.jobLanguage);
      if (filters.skills) params.append("skills", filters.skills);
      if (filters.occupation) params.append("occupation", filters.occupation);
      if (filters.educationLevel)
        params.append("educationLevel", filters.educationLevel);
      if (filters.languageRequired)
        params.append("languageRequired", filters.languageRequired);
      if (filters.datePosted) params.append("datePosted", filters.datePosted);

      const response = await fetch(
        `http://localhost:5000/api/jobs/all?${params}`,
      );
      let data = await response.json();

      // Apply client-side sorting
      data = sortJobs(data, sortBy);

      setJobs(data);
      if (data.length > 0) setSelectedJob(data[0]);
    } catch (err) {
      console.log(err);
    }
  };

  const sortJobs = (jobsList, sortType) => {
    const jobsCopy = [...jobsList];

    switch (sortType) {
      case "datePosted":
        return jobsCopy.sort((a, b) => {
          const dateA = new Date(a.datePosted || 0);
          const dateB = new Date(b.datePosted || 0);
          return dateB - dateA; // newest first
        });

      case "salary":
        return jobsCopy.sort((a, b) => {
          const salaryA = parseInt(a.salaryBand || a.salary || 0);
          const salaryB = parseInt(b.salaryBand || b.salary || 0);
          return salaryB - salaryA; // highest first
        });

      case "relevance":
      default:
        return jobsCopy;
    }
  };

  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value === "all" ? "" : value,
    }));
  };

  const handleSearchChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleReset = () => {
    setFilters({
      keyword: "",
      location: "",
      salaryBand: "",
      workMode: "",
      distance: "",
      jobType: "",
      jobLanguage: "",
      skills: "",
      occupation: "",
      educationLevel: "",
      languageRequired: "",
      datePosted: "",
    });
  };

  const getActiveFilterCount = () => {
    return Object.values(filters).filter((val) => val !== "").length;
  };

  return (
    <div className="jobs-container">
      {/* SEARCH & FILTER BAR */}
      <div className="search-filter-section">
        {/* SEARCH BAR */}
        <div className="search-bar-container">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Job title, keywords, or company"
              value={filters.keyword}
              onChange={(e) => handleSearchChange("keyword", e.target.value)}
            />
            <input
              type="text"
              placeholder="City, state, zip code, or 'remote'"
              value={filters.location}
              onChange={(e) => handleSearchChange("location", e.target.value)}
            />
            <button className="find-jobs-btn">Find Jobs</button>
          </div>
        </div>

        {/* FILTER PILLS */}
        <div className="filter-pills-container">
          {/* PAY */}
          <div className="filter-pill-button-wrapper">
            <button
              className={`filter-pill-button ${filters.salaryBand ? "active" : ""}`}
              onClick={() =>
                setOpenDropdown(openDropdown === "pay" ? null : "pay")
              }
            >
              Pay
              {filters.salaryBand && <span className="filter-badge">1</span>}
            </button>
            {openDropdown === "pay" && (
              <div className="filter-dropdown">
                <button
                  className="filter-option"
                  onClick={() => {
                    handleFilterChange("salaryBand", "");
                    setOpenDropdown(null);
                  }}
                >
                  All
                </button>
                <button
                  className="filter-option"
                  onClick={() => {
                    handleFilterChange("salaryBand", "12000");
                    setOpenDropdown(null);
                  }}
                >
                  ₹12,000
                </button>
                <button
                  className="filter-option"
                  onClick={() => {
                    handleFilterChange("salaryBand", "15000");
                    setOpenDropdown(null);
                  }}
                >
                  ₹15,000
                </button>
                <button
                  className="filter-option"
                  onClick={() => {
                    handleFilterChange("salaryBand", "18000");
                    setOpenDropdown(null);
                  }}
                >
                  ₹18,000
                </button>
                <button
                  className="filter-option"
                  onClick={() => {
                    handleFilterChange("salaryBand", "22500");
                    setOpenDropdown(null);
                  }}
                >
                  ₹22,500
                </button>
                <button
                  className="filter-option"
                  onClick={() => {
                    handleFilterChange("salaryBand", "30000");
                    setOpenDropdown(null);
                  }}
                >
                  ₹30,000+
                </button>
              </div>
            )}
          </div>

          {/* WORK MODE */}
          <div className="filter-pill-button-wrapper">
            <button
              className={`filter-pill-button ${filters.workMode ? "active" : ""}`}
              onClick={() =>
                setOpenDropdown(openDropdown === "workMode" ? null : "workMode")
              }
            >
              Remote
              {filters.workMode && <span className="filter-badge">1</span>}
            </button>
            {openDropdown === "workMode" && (
              <div className="filter-dropdown">
                <button
                  className="filter-option"
                  onClick={() => {
                    handleFilterChange("workMode", "");
                    setOpenDropdown(null);
                  }}
                >
                  All
                </button>
                <button
                  className="filter-option"
                  onClick={() => {
                    handleFilterChange("workMode", "Remote");
                    setOpenDropdown(null);
                  }}
                >
                  Remote
                </button>
                <button
                  className="filter-option"
                  onClick={() => {
                    handleFilterChange("workMode", "Hybrid");
                    setOpenDropdown(null);
                  }}
                >
                  Hybrid
                </button>
              </div>
            )}
          </div>

          {/* DISTANCE */}
          <div className="filter-pill-button-wrapper">
            <button
              className={`filter-pill-button ${filters.distance ? "active" : ""}`}
              onClick={() =>
                setOpenDropdown(openDropdown === "distance" ? null : "distance")
              }
            >
              Distance
              {filters.distance && <span className="filter-badge">1</span>}
            </button>
            {openDropdown === "distance" && (
              <div className="filter-dropdown">
                <button
                  className="filter-option"
                  onClick={() => {
                    handleFilterChange("distance", "");
                    setOpenDropdown(null);
                  }}
                >
                  All
                </button>
                <button
                  className="filter-option"
                  onClick={() => {
                    handleFilterChange("distance", "0");
                    setOpenDropdown(null);
                  }}
                >
                  Exact location
                </button>
                <button
                  className="filter-option"
                  onClick={() => {
                    handleFilterChange("distance", "5");
                    setOpenDropdown(null);
                  }}
                >
                  5 km
                </button>
                <button
                  className="filter-option"
                  onClick={() => {
                    handleFilterChange("distance", "10");
                    setOpenDropdown(null);
                  }}
                >
                  10 km
                </button>
                <button
                  className="filter-option"
                  onClick={() => {
                    handleFilterChange("distance", "15");
                    setOpenDropdown(null);
                  }}
                >
                  15 km
                </button>
                <button
                  className="filter-option"
                  onClick={() => {
                    handleFilterChange("distance", "20");
                    setOpenDropdown(null);
                  }}
                >
                  20 km
                </button>
                <button
                  className="filter-option"
                  onClick={() => {
                    handleFilterChange("distance", "25");
                    setOpenDropdown(null);
                  }}
                >
                  25 km
                </button>
                <button
                  className="filter-option"
                  onClick={() => {
                    handleFilterChange("distance", "30");
                    setOpenDropdown(null);
                  }}
                >
                  30 km
                </button>
                <button
                  className="filter-option"
                  onClick={() => {
                    handleFilterChange("distance", "35");
                    setOpenDropdown(null);
                  }}
                >
                  35 km
                </button>
              </div>
            )}
          </div>

          {/* JOB TYPE */}
          <div className="filter-pill-button-wrapper">
            <button
              className={`filter-pill-button ${filters.jobType ? "active" : ""}`}
              onClick={() =>
                setOpenDropdown(openDropdown === "jobType" ? null : "jobType")
              }
            >
              Job type
              {filters.jobType && <span className="filter-badge">1</span>}
            </button>
            {openDropdown === "jobType" && (
              <div className="filter-dropdown">
                <button
                  className="filter-option"
                  onClick={() => {
                    handleFilterChange("jobType", "");
                    setOpenDropdown(null);
                  }}
                >
                  All
                </button>
                <button
                  className="filter-option"
                  onClick={() => {
                    handleFilterChange("jobType", "Full-Time");
                    setOpenDropdown(null);
                  }}
                >
                  Full-Time
                </button>
                <button
                  className="filter-option"
                  onClick={() => {
                    handleFilterChange("jobType", "Permanent");
                    setOpenDropdown(null);
                  }}
                >
                  Permanent
                </button>
                <button
                  className="filter-option"
                  onClick={() => {
                    handleFilterChange("jobType", "Temporary");
                    setOpenDropdown(null);
                  }}
                >
                  Temporary
                </button>
                <button
                  className="filter-option"
                  onClick={() => {
                    handleFilterChange("jobType", "Fresher");
                    setOpenDropdown(null);
                  }}
                >
                  Fresher
                </button>
                <button
                  className="filter-option"
                  onClick={() => {
                    handleFilterChange("jobType", "Part-Time");
                    setOpenDropdown(null);
                  }}
                >
                  Part-Time
                </button>
                <button
                  className="filter-option"
                  onClick={() => {
                    handleFilterChange("jobType", "Internship");
                    setOpenDropdown(null);
                  }}
                >
                  Internship
                </button>
              </div>
            )}
          </div>

          {/* JOB LANGUAGE */}
          <div className="filter-pill-button-wrapper">
            <button
              className={`filter-pill-button ${filters.jobLanguage ? "active" : ""}`}
              onClick={() =>
                setOpenDropdown(
                  openDropdown === "jobLanguage" ? null : "jobLanguage",
                )
              }
            >
              Job Language
              {filters.jobLanguage && <span className="filter-badge">1</span>}
            </button>
            {openDropdown === "jobLanguage" && (
              <div className="filter-dropdown">
                <button
                  className="filter-option"
                  onClick={() => {
                    handleFilterChange("jobLanguage", "");
                    setOpenDropdown(null);
                  }}
                >
                  All
                </button>
                <button
                  className="filter-option"
                  onClick={() => {
                    handleFilterChange("jobLanguage", "Hindi");
                    setOpenDropdown(null);
                  }}
                >
                  Hindi
                </button>
                <button
                  className="filter-option"
                  onClick={() => {
                    handleFilterChange("jobLanguage", "English");
                    setOpenDropdown(null);
                  }}
                >
                  English
                </button>
              </div>
            )}
          </div>

          {/* SKILLS */}
          <div className="filter-pill-button-wrapper">
            <button
              className={`filter-pill-button ${filters.skills ? "active" : ""}`}
              onClick={() =>
                setOpenDropdown(openDropdown === "skills" ? null : "skills")
              }
            >
              Skills
              {filters.skills && <span className="filter-badge">1</span>}
            </button>
            {openDropdown === "skills" && (
              <div className="filter-dropdown">
                <input
                  type="text"
                  placeholder="Search skills..."
                  value={filters.skills}
                  onChange={(e) => handleSearchChange("skills", e.target.value)}
                  className="filter-search-input"
                />
              </div>
            )}
          </div>

          {/* OCCUPATION */}
          <div className="filter-pill-button-wrapper">
            <button
              className={`filter-pill-button ${filters.occupation ? "active" : ""}`}
              onClick={() =>
                setOpenDropdown(
                  openDropdown === "occupation" ? null : "occupation",
                )
              }
            >
              Occupation
              {filters.occupation && <span className="filter-badge">1</span>}
            </button>
            {openDropdown === "occupation" && (
              <div className="filter-dropdown">
                <input
                  type="text"
                  placeholder="Search occupation..."
                  value={filters.occupation}
                  onChange={(e) =>
                    handleSearchChange("occupation", e.target.value)
                  }
                  className="filter-search-input"
                />
              </div>
            )}
          </div>

          {/* EDUCATION LEVEL */}
          <div className="filter-pill-button-wrapper">
            <button
              className={`filter-pill-button ${filters.educationLevel ? "active" : ""}`}
              onClick={() =>
                setOpenDropdown(
                  openDropdown === "educationLevel" ? null : "educationLevel",
                )
              }
            >
              Education level
              {filters.educationLevel && (
                <span className="filter-badge">1</span>
              )}
            </button>
            {openDropdown === "educationLevel" && (
              <div className="filter-dropdown">
                <button
                  className="filter-option"
                  onClick={() => {
                    handleFilterChange("educationLevel", "");
                    setOpenDropdown(null);
                  }}
                >
                  All
                </button>
                <button
                  className="filter-option"
                  onClick={() => {
                    handleFilterChange("educationLevel", "High School");
                    setOpenDropdown(null);
                  }}
                >
                  High School
                </button>
                <button
                  className="filter-option"
                  onClick={() => {
                    handleFilterChange("educationLevel", "Diploma");
                    setOpenDropdown(null);
                  }}
                >
                  Diploma
                </button>
                <button
                  className="filter-option"
                  onClick={() => {
                    handleFilterChange("educationLevel", "Graduate");
                    setOpenDropdown(null);
                  }}
                >
                  Graduate
                </button>
                <button
                  className="filter-option"
                  onClick={() => {
                    handleFilterChange("educationLevel", "Postgraduate");
                    setOpenDropdown(null);
                  }}
                >
                  Postgraduate
                </button>
              </div>
            )}
          </div>

          {/* LANGUAGE REQUIREMENT */}
          <div className="filter-pill-button-wrapper">
            <button
              className={`filter-pill-button ${filters.languageRequired ? "active" : ""}`}
              onClick={() =>
                setOpenDropdown(
                  openDropdown === "languageRequired"
                    ? null
                    : "languageRequired",
                )
              }
            >
              Language requirement
              {filters.languageRequired && (
                <span className="filter-badge">1</span>
              )}
            </button>
            {openDropdown === "languageRequired" && (
              <div className="filter-dropdown">
                <button
                  className="filter-option"
                  onClick={() => {
                    handleFilterChange("languageRequired", "");
                    setOpenDropdown(null);
                  }}
                >
                  All
                </button>
                <button
                  className="filter-option"
                  onClick={() => {
                    handleFilterChange("languageRequired", "Hindi");
                    setOpenDropdown(null);
                  }}
                >
                  Hindi
                </button>
                <button
                  className="filter-option"
                  onClick={() => {
                    handleFilterChange("languageRequired", "English");
                    setOpenDropdown(null);
                  }}
                >
                  English
                </button>
                <button
                  className="filter-option"
                  onClick={() => {
                    handleFilterChange("languageRequired", "Punjabi");
                    setOpenDropdown(null);
                  }}
                >
                  Punjabi
                </button>
                <button
                  className="filter-option"
                  onClick={() => {
                    handleFilterChange("languageRequired", "Kannada");
                    setOpenDropdown(null);
                  }}
                >
                  Kannada
                </button>
                <button
                  className="filter-option"
                  onClick={() => {
                    handleFilterChange("languageRequired", "Odishi");
                    setOpenDropdown(null);
                  }}
                >
                  Odishi
                </button>
              </div>
            )}
          </div>

          {/* DATE POSTED */}
          <div className="filter-pill-button-wrapper">
            <button
              className={`filter-pill-button ${filters.datePosted ? "active" : ""}`}
              onClick={() =>
                setOpenDropdown(
                  openDropdown === "datePosted" ? null : "datePosted",
                )
              }
            >
              Date posted
              {filters.datePosted && <span className="filter-badge">1</span>}
            </button>
            {openDropdown === "datePosted" && (
              <div className="filter-dropdown">
                <button
                  className="filter-option"
                  onClick={() => {
                    handleFilterChange("datePosted", "");
                    setOpenDropdown(null);
                  }}
                >
                  Any
                </button>
                <button
                  className="filter-option"
                  onClick={() => {
                    handleFilterChange("datePosted", "1");
                    setOpenDropdown(null);
                  }}
                >
                  Last 24 Hours
                </button>
                <button
                  className="filter-option"
                  onClick={() => {
                    handleFilterChange("datePosted", "3");
                    setOpenDropdown(null);
                  }}
                >
                  Last 3 Days
                </button>
                <button
                  className="filter-option"
                  onClick={() => {
                    handleFilterChange("datePosted", "7");
                    setOpenDropdown(null);
                  }}
                >
                  Last 7 Days
                </button>
                <button
                  className="filter-option"
                  onClick={() => {
                    handleFilterChange("datePosted", "14");
                    setOpenDropdown(null);
                  }}
                >
                  Last 14 Days
                </button>
              </div>
            )}
          </div>

          {/* RESET BUTTON */}
          {getActiveFilterCount() > 0 && (
            <button className="reset-filters-btn" onClick={handleReset}>
              Clear all
            </button>
          )}
        </div>
      </div>

      {/* MAIN CONTENT - 2 COLUMN LAYOUT */}
      <div className="jobs-main-content">
        {/* LEFT COLUMN - JOB LISTINGS */}
        <div className="jobs-list-section">
          <div className="jobs-list-header">
            <p className="job-count">{jobs.length} jobs found</p>
            <div className="sort-options">
              <span>Sort by:</span>
              <select
                className="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="relevance">Relevance</option>
                <option value="datePosted">Date posted</option>
                <option value="salary">Salary</option>
              </select>
            </div>
          </div>

          <div className="jobs-list">
            {jobs.length === 0 ? (
              <p className="no-jobs">No jobs found matching your criteria</p>
            ) : (
              jobs.map((job) => (
                <div
                  className={`job-list-item ${
                    selectedJob?._id === job._id ? "active" : ""
                  }`}
                  key={job._id}
                  onClick={() => setSelectedJob(job)}
                >
                  <div className="job-list-item-header">
                    <h3>{job.title}</h3>
                    <button className="save-job-btn"></button>
                  </div>
                  <p className="company-name">{job.companyName}</p>
                  <p className="location">{job.location}</p>
                  <div className="salary-job-type">
                    <span className="salary">
                      {job.salaryBand
                        ? `₹${job.salaryBand}`
                        : job.salary
                          ? `₹${job.salary}`
                          : "Salary not specified"}
                    </span>
                    <span className="job-type">{job.jobType}</span>
                  </div>
                  {job.workMode && (
                    <span className="work-mode-badge">{job.workMode}</span>
                  )}
                  <p className="easily-apply">Easily apply</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* RIGHT COLUMN - JOB DETAILS */}
        {selectedJob && (
          <div className="job-details-section">
            <div className="job-details-header">
              <h1>{selectedJob.title}</h1>
              <button className="save-large-btn"></button>
            </div>

            <div className="company-info">
              <p className="company-name">{selectedJob.companyName}</p>
              <p className="company-rating">⭐ {selectedJob.rating || "4.0"}</p>
            </div>

            <div className="salary-location">
              <p className="salary-range">
                {selectedJob.salaryBand
                  ? `₹${selectedJob.salaryBand}`
                  : selectedJob.salary
                    ? `₹${selectedJob.salary}`
                    : "Salary not specified"}
              </p>
              <p className="location">
                {selectedJob.location || "Not specified"}
              </p>
            </div>

            <button
              className="apply-btn"
              onClick={() =>
                navigate("/application/contact", {
                  state: { job: selectedJob },
                })
              }
            >
              Apply
            </button>

            <hr />

            <div className="job-details-info">
              <h2>Job details</h2>

              <div className="details-row">
                <span className="detail-label">Pay</span>
                <span className="detail-value">
                  {selectedJob.salaryBand
                    ? `₹${selectedJob.salaryBand}`
                    : selectedJob.salary
                      ? `₹${selectedJob.salary}`
                      : "Not specified"}
                </span>
              </div>

              <div className="details-row">
                <span className="detail-label">Job type</span>
                <span className="detail-value">{selectedJob.jobType}</span>
              </div>

              {selectedJob.workMode && (
                <div className="details-row">
                  <span className="detail-label">Work Mode</span>
                  <span className="detail-value">{selectedJob.workMode}</span>
                </div>
              )}

              {selectedJob.distance && (
                <div className="details-row">
                  <span className="detail-label">Distance</span>
                  <span className="detail-value">
                    {selectedJob.distance} km
                  </span>
                </div>
              )}

              {selectedJob.occupation && (
                <div className="details-row">
                  <span className="detail-label">Occupation</span>
                  <span className="detail-value">{selectedJob.occupation}</span>
                </div>
              )}

              {selectedJob.jobLanguage && (
                <div className="details-row">
                  <span className="detail-label">Job Language</span>
                  <span className="detail-value">
                    {selectedJob.jobLanguage}
                  </span>
                </div>
              )}

              {selectedJob.languageRequired && (
                <div className="details-row">
                  <span className="detail-label">Language Required</span>
                  <span className="detail-value">
                    {selectedJob.languageRequired}
                  </span>
                </div>
              )}

              {selectedJob.datePosted && (
                <div className="details-row">
                  <span className="detail-label">Posted</span>
                  <span className="detail-value">
                    {new Date(selectedJob.datePosted).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>

            <hr />

            {selectedJob.companyAbout && (
              <div className="job-section">
                <h3>Company</h3>
                <p>{selectedJob.companyAbout}</p>
              </div>
            )}

            {selectedJob.responsibilities && (
              <div className="job-section">
                <h3>Responsibilities</h3>
                <p>{selectedJob.responsibilities}</p>
              </div>
            )}

            {selectedJob.requirements && (
              <div className="job-section">
                <h3>Requirements</h3>
                <p>{selectedJob.requirements}</p>
              </div>
            )}

            {selectedJob.skills && (
              <div className="job-section">
                <h3>Required Skills</h3>
                <p>{selectedJob.skills}</p>
              </div>
            )}

            {selectedJob.whatWeOffer && (
              <div className="job-section">
                <h3>What We Offer</h3>
                <p>{selectedJob.whatWeOffer}</p>
              </div>
            )}

            <hr />
            <button className="report-job-btn">Report job</button>
          </div>
        )}
      </div>
    </div>
  );
}
