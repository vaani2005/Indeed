import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function EmployerLogin() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState(1);
  const [mode, setMode] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { loginEmployer } = useAuth();
  const BASE_URL = "http://localhost:5000/api/employer-auth";

  // ✅ CHECK USER
  const checkUser = async () => {
    if (!email) return alert("Email required");

    try {
      setLoading(true);

      const res = await fetch(`${BASE_URL}/check-user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      console.log("checkUser response:", data);

      if (data.exists) {
        setMode("login");
      } else {
        setMode("register");

        await fetch(`${BASE_URL}/send-otp`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
      }

      setStep(2);
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // ✅ LOGIN
  const loginUser = async () => {
    if (password.length < 6) return alert("Password too short");

    try {
      setLoading(true);

      const res = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      console.log("login response:", res.status, data);

      if (res.ok) {
        loginEmployer(data.token);
        console.log("Redirecting to /employer-info");
        navigate("/employer-info", { replace: true });
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Login failed");
    } finally {
      setLoading(false);
    }
  };

  // ✅ VERIFY OTP
  const verifyOtp = async () => {
    if (!otp || password.length < 6) {
      return alert("Enter valid OTP & password");
    }

    try {
      setLoading(true);

      const res = await fetch(`${BASE_URL}/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, password }),
      });

      const data = await res.json();

      console.log("verifyOtp response:", res.status, data);

      if (res.ok) {
        loginEmployer(data.token);
        console.log("Redirecting to /employer-info");
        navigate("/employer-info", { replace: true });
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert("OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-left">
          <h1>Find your next opportunity</h1>
          <p>Sign in or create an account to continue</p>
        </div>

        <div className="auth-card">
          <h2>Employer Login</h2>

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

              <button onClick={loginUser} disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>

              <p onClick={() => setStep(1)}>Change Email</p>
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

              <button onClick={verifyOtp} disabled={loading}>
                {loading ? "Verifying..." : "Verify OTP"}
              </button>

              <p onClick={() => setStep(1)}>Change Email</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
