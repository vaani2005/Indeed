import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { isAuthenticated, userType, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <section className="navbar">
      <div className="logo">
        <img src="/logo.png" alt="Indeed Logo" />
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/company-review">Company Reviews</Link>
          </li>
          <li>
            <Link to="/jobs">Find Jobs</Link>
          </li>
        </ul>
      </nav>
      <div className="sign-in">
        {isAuthenticated ? (
          <>
            <span style={{ marginRight: "10px", color: "#0a66c2" }}>
              {userType === "employer" ? "Employer" : "Job Seeker"}
            </span>
            <button
              onClick={handleLogout}
              style={{
                padding: "8px 16px",
                backgroundColor: "#e74c3c",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/employer-login">Employers / Post Job</Link>
        )}
      </div>
    </section>
  );
}
