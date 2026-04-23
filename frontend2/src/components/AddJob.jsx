// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom"; // ✅ REQUIRED
// import { useAuth } from "../context/AuthContext";
// export default function AddJob() {
//   const navigate = useNavigate();

//   const { getAuthToken, isAuthenticated, userType, isLoading } = useAuth(); // ✅ FIX

//   const [formData, setFormData] = useState({
//     title: "",
//     companyName: "",
//     location: "",
//     salary: "",
//     jobType: "",
//     jobDescription: "",
//     companyAbout: "",
//     responsibilities: "",
//     requirements: "",
//     skills: "",
//     whatWeOffer: "",
//     applicationMethod: "indeed",
//     applicationUrl: "",
//   });

//   useEffect(() => {
//     if (isLoading) return;

//     if (!isAuthenticated || userType !== "employer") {
//       navigate("/employer-login");
//       return;
//     }

//     const employer = JSON.parse(localStorage.getItem("employerInfo") || "{}");
//     if (employer?.companyName) {
//       setFormData((prev) => ({
//         ...prev,
//         companyName: employer.companyName,
//       }));
//     }
//   }, [isAuthenticated, userType, isLoading, navigate]);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const token = getAuthToken();

//     if (!token) {
//       alert("User not logged in");
//       navigate("/employer-login");
//       return;
//     }

//     try {
//       const res = await fetch("http://localhost:5000/api/jobs", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: token,
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         alert("Job added successfully ✅");
//         navigate("/employer-dashboard");
//       } else {
//         alert(data.message);
//       }
//     } catch (err) {
//       console.log(err);
//       alert("Error adding job");
//     }
//   };

//   return (
//     <div className="add-job">
//       <h2>Add Job</h2>

//       <form onSubmit={handleSubmit}>
//         <input
//           name="title"
//           placeholder="Job Title"
//           value={formData.title}
//           onChange={handleChange}
//           required
//         />

//         <input
//           name="companyName"
//           placeholder="Company Name"
//           value={formData.companyName}
//           onChange={handleChange}
//           required
//         />

//         <input
//           name="location"
//           placeholder="Location"
//           value={formData.location}
//           onChange={handleChange}
//         />

//         <input
//           name="salary"
//           type="number"
//           placeholder="Salary"
//           value={formData.salary}
//           onChange={handleChange}
//         />

//         {/* Job Type */}
//         <select name="jobType" value={formData.jobType} onChange={handleChange}>
//           <option value="">Select Job Type</option>
//           <option value="Full-Time">Full-Time</option>
//           <option value="Part-Time">Part-Time</option>
//           <option value="Internship">Internship</option>
//           <option value="Contract">Contract</option>
//         </select>

//         <textarea
//           name="jobDescription"
//           placeholder="Job Description"
//           value={formData.jobDescription}
//           onChange={handleChange}
//         />

//         <textarea
//           name="companyAbout"
//           placeholder="Company About"
//           value={formData.companyAbout}
//           onChange={handleChange}
//         />

//         <textarea
//           name="responsibilities"
//           placeholder="Responsibilities"
//           value={formData.responsibilities}
//           onChange={handleChange}
//         />

//         <textarea
//           name="requirements"
//           placeholder="Requirements"
//           value={formData.requirements}
//           onChange={handleChange}
//         />

//         <input
//           name="skills"
//           placeholder="Skills"
//           value={formData.skills}
//           onChange={handleChange}
//         />

//         <textarea
//           name="whatWeOffer"
//           placeholder="What We Offer"
//           value={formData.whatWeOffer}
//           onChange={handleChange}
//         />
//         <div className="apply-method">
//           <h4>How should candidates apply?</h4>

//           <div className="radio-group">
//             <label className="radio-option">
//               <input
//                 type="radio"
//                 name="applicationMethod"
//                 value="indeed"
//                 checked={formData.applicationMethod === "indeed"}
//                 onChange={handleChange}
//               />
//               Apply on Indeed
//             </label>

//             <label className="radio-option">
//               <input
//                 type="radio"
//                 name="applicationMethod"
//                 value="external"
//                 checked={formData.applicationMethod === "external"}
//                 onChange={handleChange}
//               />
//               Apply on Company Site
//             </label>
//           </div>

//           {formData.applicationMethod === "external" && (
//             <input
//               className="url-input"
//               name="applicationUrl"
//               placeholder="Enter company application URL"
//               value={formData.applicationUrl}
//               onChange={handleChange}
//             />
//           )}
//         </div>

//         <button type="submit">Add Job</button>
//       </form>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AddJob() {
  const navigate = useNavigate();

  const {
    getAuthToken,
    isAuthenticated,
    userType,
    isLoading,
    user, // ✅ IMPORTANT: use AuthContext user
  } = useAuth();

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
    applicationMethod: "indeed",
    applicationUrl: "",
  });

  // ✅ AUTH GUARD + AUTO FILL COMPANY NAME
  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated || userType !== "employer") {
      navigate("/employer-login");
      return;
    }

    // ✅ Use AuthContext instead of localStorage
    if (user?.companyName) {
      setFormData((prev) => ({
        ...prev,
        companyName: user.companyName,
      }));
    }
  }, [isAuthenticated, userType, isLoading, navigate, user]);

  // ✅ SAFE STATE UPDATE
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ SUBMIT JOB
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

        {/* APPLY METHOD */}
        <div className="apply-method">
          <h4>How should candidates apply?</h4>

          <label>
            <input
              type="radio"
              name="applicationMethod"
              value="indeed"
              checked={formData.applicationMethod === "indeed"}
              onChange={handleChange}
            />
            Apply on Indeed
          </label>

          <label>
            <input
              type="radio"
              name="applicationMethod"
              value="external"
              checked={formData.applicationMethod === "external"}
              onChange={handleChange}
            />
            Apply on Company Site
          </label>

          {formData.applicationMethod === "external" && (
            <input
              name="applicationUrl"
              placeholder="Enter application URL"
              value={formData.applicationUrl}
              onChange={handleChange}
            />
          )}
        </div>

        <button type="submit">Add Job</button>
      </form>
    </div>
  );
}
