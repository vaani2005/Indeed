import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ResumeSelectionForm from "../components/ResumeSelectionForm";

export default function ResumeSelectionPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [submitting, setSubmitting] = useState(false);

  const job = location.state?.job;
  const contactData = location.state?.contactData;
  const locationData = location.state?.locationData;

  const handleContinue = async (formData) => {
    setSubmitting(true);
    try {
      // Combine all application data
      const applicationData = {
        jobId: job?._id,
        jobTitle: job?.title,
        companyName: job?.companyName,
        contactInfo: contactData,
        locationInfo: locationData,
        resumeInfo: formData,
        submittedAt: new Date().toISOString(),
      };

      console.log("Complete Application Data:", applicationData);
      alert("Application submitted successfully!");
      navigate("/jobs", { state: { job } });
    } catch (error) {
      console.error("Application submission error:", error);
      alert("Error submitting application. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleBack = () => {
    navigate("/application/location", {
      state: { job, contactData },
    });
  };

  return (
    <ResumeSelectionForm
      job={job}
      onContinue={handleContinue}
      onBack={handleBack}
      submitting={submitting}
    />
  );
}
