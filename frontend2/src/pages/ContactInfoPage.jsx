import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ContactInfoForm from "../components/ContactInfoForm";

export default function ContactInfoPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [contactData, setContactData] = useState(null);

  const job = location.state?.job;

  const handleContinue = (formData) => {
    setContactData(formData);
    navigate("/application/location", {
      state: {
        job,
        contactData: formData,
      },
    });
  };

  const handleClose = () => {
    navigate("/jobs", { state: { job } });
  };

  return (
    <ContactInfoForm
      job={job}
      onContinue={handleContinue}
      onClose={handleClose}
    />
  );
}
