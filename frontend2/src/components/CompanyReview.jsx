import "./CompanyReview.css";

export default function CompanyReview({ filters, handleSearchChange }) {
  const handleFindJobs = () => {
    // Redirect to main job search with current filters
    const params = new URLSearchParams();
    if (filters.company) params.append("keyword", filters.company);
    if (filters.location) params.append("location", filters.location);
    window.location.href = `/jobs?${params}`;
  };

  // Company data with ratings
  const companies = [
    { name: "Indeed", image: "/img/indeed.jpeg", rating: 4.2, reviews: 1805 },
    { name: "EY", image: "/img/ey.jpeg", rating: 4.1, reviews: 2150 },
    { name: "Rapido", image: "/img/Rapido.jpeg", rating: 3.8, reviews: 950 },
    { name: "Zepto", image: "/img/zepto.svg", rating: 4.0, reviews: 1200 },
    { name: "HDFC", image: "/img/hdfc.jpeg", rating: 3.9, reviews: 1800 },
    { name: "BandhanBank", image: "/img/bandhanBank.jpeg", rating: 3.7, reviews: 850 },
    { name: "Amazon", image: "/img/Amazon.jpeg", rating: 4.3, reviews: 3200 },
    { name: "Accenture", image: "/img/accenture.jpeg", rating: 4.1, reviews: 2800 },
  ];

  // Filter companies based on selected filters
  const filteredCompanies = companies.filter((company) => {
    // Filter by company name if selected
    if (filters.company && !company.name.toLowerCase().includes(filters.company.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <section className="company-review-section">
      <div className="container">
        <h2>Find great places to work</h2>
        <p>Get access to millions of company reviews</p>
        <div className="search-filter-section">
          
          <div className="search-bar">
            <input
              type="text"
              placeholder="Company name or job title"
              value={filters.company || ""}
              onChange={(e) => handleSearchChange("company", e.target.value)}
            />
            <input
              type="text"
              placeholder="City, state, zip code, or 'remote'"
              value={filters.location}
              onChange={(e) => handleSearchChange("location", e.target.value)}
            />
            <button className="find-jobs-btn" onClick={handleFindJobs}>
              Find Jobs
            </button>
          </div>
          <p>Do you want to search for salaries?</p>
        </div>
        <div className="popular-company">
          {filteredCompanies.map((company, index) => (
            <div key={index} className="company-card">
              <img src={company.image} alt={company.name} />
              <p>{company.name}</p>
              <p>{company.rating}★</p>
              <p>{company.reviews} reviews</p>
              <p>salary</p>
              <p>Question</p>
              <p>Open jobs</p>
            </div>
          ))}
        </div>
        <div>
          <h2>Rate your recent employer: </h2>
        </div>
      </div>
    </section>
  );
}
