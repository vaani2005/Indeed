import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./EmployerDashboard.css";

export default function EmployerDashboard() {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  const {
    getAuthToken,
    isAuthenticated,
    userType,
    logout,
    isLoading,
    user, // 👈 logged-in user (IMPORTANT)
  } = useAuth();

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated || userType !== "employer") {
      navigate("/employer-login");
      return;
    }

    fetchJobs();
  }, [isAuthenticated, userType, isLoading, navigate]);

  const fetchJobs = async () => {
    try {
      const token = getAuthToken();

      const res = await fetch("http://localhost:5000/api/jobs", {
        headers: { Authorization: token },
      });

      const data = await res.json();
      setJobs(data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteJob = async (id) => {
    if (!window.confirm("Delete this job?")) return;

    try {
      const token = getAuthToken();

      await fetch(`http://localhost:5000/api/jobs/${id}`, {
        method: "DELETE",
        headers: { Authorization: token },
      });

      setJobs((prev) => prev.filter((job) => job._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="dashboard-container">
      {/* HEADER */}
      <div className="dashboard-header">
        <div>
          <h2>Employer Dashboard</h2>
          <p className="welcome-text">
            Welcome, <span>{user?.firstName}</span> 👋
          </p>
        </div>

        <button
          className="logout-btn"
          onClick={() => {
            logout();
            navigate("/employer-login");
          }}
        >
          Sign Out
        </button>
      </div>

      {/* ACTIONS */}
      <div className="dashboard-actions">
        <button className="add-btn" onClick={() => navigate("/add-job")}>
          + Add New Job
        </button>
      </div>

      {/* JOB LIST */}
      <div className="job-grid">
        {jobs.length === 0 ? (
          <p className="empty-text">No jobs posted yet</p>
        ) : (
          jobs.map((job) => (
            <div key={job._id} className="job-card">
              <h3>{job.title}</h3>
              <p className="company">{job.companyName}</p>
              <p className="location">📍 {job.location}</p>

              <div className="card-actions">
                <button
                  className="delete-btn"
                  onClick={() => deleteJob(job._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
