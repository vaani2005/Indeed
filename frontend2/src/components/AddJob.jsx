import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AddJob() {
  const navigate = useNavigate();
  const { getAuthToken, isAuthenticated } = useAuth();

  const [formData, setFormData] = useState({
    title: "",
    companyName: "",
    location: "",
    salary: "",
    jobType: "",
    jobDescription: "",
    companyAbout: "",
    responsibilities: "",
    requirements: "",
    skills: "",
    whatWeOffer: "",
  });

  // ✅ PROTECT ROUTE + AUTO-FILL
  useEffect(() => {
    // 🔒 Redirect if not logged in
    if (!isAuthenticated) {
      navigate("/employer-login");
      return;
    }

    // ✅ Auto-fill company name
    const employer = JSON.parse(localStorage.getItem("employerInfo"));

    if (employer?.companyName) {
      setFormData((prev) => ({
        ...prev,
        companyName: employer.companyName,
      }));
    }
  }, [isAuthenticated, navigate]);

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // SUBMIT FORM
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = getAuthToken();

    if (!token) {
      alert("User not logged in");
      navigate("/employer-login");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Job added successfully ✅");
        navigate("/employer-dashboard");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.log(err);
      alert("Error adding job");
    }
  };

  return (
    <div className="add-job">
      <h2>Add Job</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Job Title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <input
          name="companyName"
          placeholder="Company Name"
          value={formData.companyName}
          onChange={handleChange}
          required
        />

        <input
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
        />

        <input
          name="salary"
          type="number"
          placeholder="Salary"
          value={formData.salary}
          onChange={handleChange}
        />

        {/* Job Type */}
        <select name="jobType" value={formData.jobType} onChange={handleChange}>
          <option value="">Select Job Type</option>
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Internship">Internship</option>
          <option value="Contract">Contract</option>
        </select>

        <textarea
          name="jobDescription"
          placeholder="Job Description"
          value={formData.jobDescription}
          onChange={handleChange}
        />

        <textarea
          name="companyAbout"
          placeholder="Company About"
          value={formData.companyAbout}
          onChange={handleChange}
        />

        <textarea
          name="responsibilities"
          placeholder="Responsibilities"
          value={formData.responsibilities}
          onChange={handleChange}
        />

        <textarea
          name="requirements"
          placeholder="Requirements"
          value={formData.requirements}
          onChange={handleChange}
        />

        <input
          name="skills"
          placeholder="Skills"
          value={formData.skills}
          onChange={handleChange}
        />

        <textarea
          name="whatWeOffer"
          placeholder="What We Offer"
          value={formData.whatWeOffer}
          onChange={handleChange}
        />

        <button type="submit">Add Job</button>
      </form>
    </div>
  );
}
