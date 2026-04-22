import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function EmployerInfo() {
  const navigate = useNavigate();
  const { getAuthToken } = useAuth();

  const [form, setForm] = useState({
    companyName: "",
    firstName: "",
    lastName: "",
    source: "",
    phone: "",
    consent: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.companyName || !form.firstName || !form.lastName) {
      alert("Please fill all required fields");
      return;
    }

    const token = getAuthToken();

    if (!token) {
      alert("User not logged in");
      navigate("/employer-login");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/employer/save-info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      console.log("Saved Employer:", data);

      if (res.ok) {
        localStorage.setItem("employerInfo", JSON.stringify(data));
        navigate("/add-job");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Error saving employer info");
    }
  };
  return (
    <div className="employer-page">
      <div className="employer-container">
        <h1>Create an employer account</h1>

        <p className="switch-link">I'm looking for a job →</p>

        <form onSubmit={handleSubmit}>
          {/* Company Name */}
          <label>Company name *</label>
          <input
            type="text"
            name="companyName"
            value={form.companyName}
            onChange={handleChange}
            required
          />

          {/* Name Row */}
          <div className="row">
            <div>
              <label>First name *</label>
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Last name *</label>
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Source */}
          <label>How did you hear about us?</label>
          <select name="source" value={form.source} onChange={handleChange}>
            <option value="">Select an option</option>
            <option value="google">Google</option>
            <option value="social">Social Media</option>
            <option value="friend">Friend</option>
          </select>

          {/* Phone */}
          <label>Phone number</label>
          <div className="phone-input">
            <span>🇮🇳 +91</span>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
            />
          </div>

          <p className="note">
            For account management communication. Not visible to jobseekers.
          </p>

          {/* Consent */}
          <div className="checkbox">
            <input
              type="checkbox"
              name="consent"
              checked={form.consent}
              onChange={handleChange}
            />
            <span>
              I agree to receive communication from Indeed (calls, texts, etc.)
            </span>
          </div>

          {/* Submit */}
          <button type="submit" className="primary-btn">
            Continue →
          </button>
        </form>
      </div>
    </div>
  );
}
