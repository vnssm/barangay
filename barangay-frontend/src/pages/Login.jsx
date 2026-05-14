import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "resident"
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        "http://localhost/1/makaballa/barangay-backend/login.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: form.email,
            password: form.password
          })
        }
      );

      const data = await res.json();

      if (!res.ok || !data.user) {
        setError(data.msg || "Login failed");
        setLoading(false);
        return;
      }

      // OPTIONAL ROLE CHECK (UI ONLY)
      if (data.user.role !== form.role) {
        setError("Incorrect role selected");
        setLoading(false);
        return;
      }

      // SAVE USER
      login(data.user);

      // REDIRECT
      if (data.user.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/dashboard");
      }

    } catch (err) {
      console.log(err);
      setError("Server not reachable");
    }

    setLoading(false);
  };

  return (
    <div style={container}>
      <div style={card}>
        <h2 style={title}>Barangay Login</h2>
        <p style={subtitle}>Sign in to access the system</p>

        {/* ROLE */}
        <select
          style={input}
          value={form.role}
          onChange={(e) =>
            setForm({ ...form, role: e.target.value })
          }
        >
          <option value="resident">Resident</option>
          <option value="admin">Admin</option>
        </select>

        {/* EMAIL */}
        <input
          style={input}
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        {/* PASSWORD */}
        <input
          type="password"
          style={input}
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        {/* ERROR */}
        {error && <p style={errorText}>{error}</p>}

        {/* BUTTON */}
        <button
          onClick={handleLogin}
          style={btn}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* SIGNUP */}
        {form.role === "resident" && (
          <p style={signupText}>
            Don't have an account?{" "}
            <span
              style={signupLink}
              onClick={() => navigate("/signup")}
            >
              Create Account
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;

/* STYLES */
const container = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #1e3a8a, #2563eb)",
  fontFamily: "Arial"
};

const card = {
  width: "350px",
  background: "white",
  padding: "30px",
  borderRadius: "12px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
  textAlign: "center"
};

const title = {
  marginBottom: "5px",
  color: "#111827"
};

const subtitle = {
  fontSize: "12px",
  color: "#6b7280",
  marginBottom: "20px"
};

const input = {
  width: "100%",
  padding: "12px",
  marginBottom: "12px",
  borderRadius: "8px",
  border: "1px solid #d1d5db",
  fontSize: "14px"
};

const btn = {
  width: "100%",
  padding: "12px",
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontWeight: "bold",
  cursor: "pointer"
};

const errorText = {
  color: "#dc2626",
  fontSize: "12px",
  marginBottom: "10px"
};

const signupText = {
  marginTop: "15px",
  fontSize: "13px",
  color: "#6b7280"
};

const signupLink = {
  color: "#2563eb",
  cursor: "pointer",
  fontWeight: "bold"
};