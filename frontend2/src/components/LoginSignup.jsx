import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginSignup() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState(1);
  const [mode, setMode] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { loginSeeker } = useAuth();

  const checkUser = async () => {
    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/auth/check-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.exists) {
        setMode("login");
        setStep(2);
      } else {
        setMode("register");

        await fetch("http://localhost:5000/api/auth/send-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });

        setStep(2);
      }
    } catch (err) {
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  const loginUser = async () => {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      loginSeeker(data.token);
      navigate("/jobs");
    } else {
      alert(data.message);
    }
  };

  const verifyOtp = async () => {
    const res = await fetch("http://localhost:5000/api/auth/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp, password }),
    });

    const data = await res.json();

    if (res.ok) {
      loginSeeker(data.token);
      navigate("/jobs");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        {/* LEFT SIDE BRAND */}
        <div className="auth-left">
          <h1>Find your next opportunity</h1>
          <p>Sign in or create an account to continue</p>
        </div>

        {/* RIGHT SIDE CARD */}
        <div className="auth-card">
          <img src="/logo.png" alt="logo" />

          <h2>Welcome</h2>
          <p className="subtitle">Login or create your account</p>

          {/* STEP 1 */}
          {step === 1 && (
            <>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <button onClick={checkUser} disabled={loading}>
                {loading ? "Checking..." : "Continue"}
              </button>
            </>
          )}

          {/* LOGIN */}
          {step === 2 && mode === "login" && (
            <>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button className="primary" onClick={loginUser}>
                Login
              </button>

              <p className="switch-text">New user will auto register via OTP</p>
            </>
          )}

          {/* REGISTER */}
          {step === 2 && mode === "register" && (
            <>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />

              <input
                type="password"
                placeholder="Set password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button className="primary" onClick={verifyOtp}>
                Verify OTP
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
