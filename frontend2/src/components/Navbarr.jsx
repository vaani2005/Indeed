import { Link } from "react-router-dom";

export function Navbarr() {
  return (
    <nav className="navbarr">
      <div className="container nav-inner">
        <img src="/img/Indeed_logo@3x.png" alt="logo" />

        <div className="nav-links">
          <Link to="/employer-login">Post a job</Link>
          <a href="#">Find CVs</a>
          <a href="#">Products</a>
          <a href="#">Resources</a>
        </div>

        <div className="nav-actions">
          <button className="btn-outline">Sign in</button>

          {/* 🔹 Button navigation */}
          <Link to="/employer-login">
            <button className="btn-primary">Post a job</button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
