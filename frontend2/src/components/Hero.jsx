import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function Hero() {
  const navigate = useNavigate();
  const { isAuthenticated, userType } = useAuth();

  const handlePostJob = () => {
    if (isAuthenticated && userType === "employer") {
      navigate("/employer-dashboard");
    } else {
      navigate("/employer-login");
    }
  };

  return (
    <section className="hero">
      <div className="container hero-inner">
        <div className="hero-left">
          <h4>INDEED FOR EMPLOYERS</h4>
          <h1>
            Let’s hire your next great candidate. <i>Fast.</i>
          </h1>
          <p>
            No matter the skills, experience or qualifications you’re looking
            for, you’ll find the right people here.
          </p>
          <button className="btn-primary" onClick={handlePostJob}>
            Post a job
          </button>
        </div>

        <div className="hero-right">
          <img src="/img/herosection.webp" alt="hero" />
        </div>
      </div>
    </section>
  );
}
