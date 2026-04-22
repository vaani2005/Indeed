import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function EmployerDashboard() {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();
  const { getAuthToken, isAuthenticated } = useAuth();

  // 🔒 Protect route
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/employer-login");
    } else {
      fetchJobs();
    }
  }, [isAuthenticated, navigate]);

  const fetchJobs = async () => {
    try {
      const token = getAuthToken();
      const res = await fetch("http://localhost:5000/api/jobs", {
        headers: {
          Authorization: token,
        },
      });

      const data = await res.json();
      setJobs(data);
    } catch (err) {
      console.log(err);
    }
  };

  // ❌ Delete job
  const deleteJob = async (id) => {
    if (!window.confirm("Delete this job?")) return;

    try {
      const token = getAuthToken();
      await fetch(`http://localhost:5000/api/jobs/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      });

      // refresh list
      setJobs(jobs.filter((job) => job._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="dashboard">
      <h2>Employer Dashboard</h2>

      <button onClick={() => navigate("/add-job")}>+ Add New Job</button>

      {jobs.length === 0 ? (
        <p>No jobs posted yet</p>
      ) : (
        jobs.map((job) => (
          <div key={job._id} className="job-card">
            <h3>{job.title}</h3>
            <p>{job.companyName}</p>
            <p>{job.location}</p>

            <button onClick={() => deleteJob(job._id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
}
