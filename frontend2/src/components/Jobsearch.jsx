import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Jobsearch() {
  const navigate = useNavigate();
  const { isAuthenticated, logout, isLoading } = useAuth();

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate("/jobs");
    } else {
      navigate("/loginsignup");
    }
  };

  const handleSignIn = () => {
    if (isAuthenticated) {
      logout();
      navigate("/");
    } else {
      navigate("/loginsignup");
    }
  };

  if (isLoading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>Loading...</div>
    );
  }

  return (
    <div className="App">
      {/* HEADER */}
      <header className="header">
        <div className="logo">
          <img src="/logo.png" alt="Indeed Logo" />
        </div>

        <nav>
          <ul>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Company Reviews</a>
            </li>
            <li>
              <a href="#">Salary Guide</a>
            </li>
          </ul>
        </nav>

        <div className="sign-in">
          <button onClick={handleSignIn} className="link-btn">
            {isAuthenticated ? "Logout" : "Sign In"}
          </button>
          <a href="/employer-login">Employers / Post Job</a>
        </div>
      </header>

      {/* MAIN */}
      <main className="main">
        <section className="search-section">
          {/* SEARCH BOX */}
          <div className="search-box">
            <input type="text" placeholder="Job title, keywords, or company" />
            <input
              type="text"
              placeholder="City, state, zip code, or 'remote'"
            />
            <button>Find Jobs</button>
          </div>

          {/* HERO */}
          <img src="/logo.png" alt="Indeed Logo" />
          <h2>Your next job starts here</h2>

          <p>
            {isAuthenticated
              ? "Explore job recommendations based on your profile."
              : "Create an account or sign in to see your personalised job recommendations."}
          </p>

          {/* GET STARTED BUTTON */}
          <button className="get-started" onClick={handleGetStarted}>
            {isAuthenticated ? "Browse Jobs" : "Get Started"}
          </button>

          <p className="language">Indeed हिंदी में भी उपलब्ध है</p>
          <p className="trending">What's trending on Indeed</p>
        </section>
      </main>

      {/* FOOTER */}
      <footer>
        <ul>
          <li>
            <a href="#">Career advice</a>
          </li>
          <li>
            <a href="#">Browse jobs</a>
          </li>
          <li>
            <a href="#">Browse companies</a>
          </li>
          <li>
            <a href="#">Salaries</a>
          </li>
          <li>
            <a href="#">Indeed Events</a>
          </li>
          <li>
            <a href="#">Work at Indeed</a>
          </li>
          <li>
            <a href="#">Countries</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
        </ul>

        <p>© 2026 Indeed | Accessibility | Privacy | Terms</p>
      </footer>
    </div>
  );
}
