export default function SearchBar() {
  return (
    <section className="search-section">
      <div className="search-box">
        <input type="text" placeholder="Job title, keywords, or company" />
        <input type="text" placeholder="City, state, zip code, or 'remote'" />
        <button>Find Jobs</button>
      </div>
    </section>
  );
}
