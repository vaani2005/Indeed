import CompanyReview from "../components/CompanyReview";
import { useState } from "react";
import Navbar from "../components/Navbar";
function CompanyReviewPage() {
  const [filters, setFilters] = useState({ 
    company: "", 
    location: "" 
  });

  const handleSearchChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div>
      <Navbar />
      <CompanyReview
        filters={filters}
        handleSearchChange={handleSearchChange}
      />
    </div>
  );
}
export default CompanyReviewPage;
