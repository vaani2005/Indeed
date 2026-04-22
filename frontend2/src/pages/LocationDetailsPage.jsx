import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LocationDetailsForm from "../components/LocationDetailsForm";

export default function LocationDetailsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [locationData, setLocationData] = useState(null);

  const job = location.state?.job;
  const contactData = location.state?.contactData;

  const handleContinue = (formData) => {
    setLocationData(formData);
    navigate("/application/resume", {
      state: {
        job,
        contactData,
        locationData: formData,
      },
    });
  };

  const handleBack = () => {
    navigate("/application/contact", {
      state: { job },
    });
  };

  return (
    <LocationDetailsForm
      job={job}
      onContinue={handleContinue}
      onBack={handleBack}
    />
  );
}
