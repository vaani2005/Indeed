export function Dashboard() {
  return (
    <section className="dashboard">
      <div className="container">
        <h1>Your Dashboard Features</h1>

        <div className="dash-row">
          <div>
            <h2>Manage your jobs</h2>
            <p>Manage open jobs and filter applications.</p>

            <h2>Choose who moves forward</h2>
            <p>Shortlist candidates easily.</p>

            <h2>Interview anywhere</h2>
            <p>Schedule and conduct interviews.</p>
          </div>
          <img src="/img/dashboard1-section.webp" alt="dashboard" />
        </div>

        <div className="dash-row">
          <img src="/img/dashboard-section.webp" alt="dashboard" />
          <div>
            <h2>Unlock matched candidates</h2>
            <p>Find candidates matching your job.</p>
            <a href="#">Explore Smart Sourcing →</a>
          </div>
        </div>

        <div className="dash-row">
          <div>
            <h2>Hiring resources for every step</h2>
            <p>Learn everything about hiring.</p>
            <a href="#">Employer Help Center</a>
            <a href="#">Employer Resource Library</a>
          </div>
          <img src="/img/dashboard1-section.webp" alt="resources" />
        </div>
      </div>
    </section>
  );
}
