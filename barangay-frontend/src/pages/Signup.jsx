import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    birthdate: "",
    gender: "",
    address: "",
    purok: "",
    contact: "",
    civil_status: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        "http://localhost/1/makaballa/barangay-backend/signup.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            password: form.password,
            birthdate: form.birthdate,
            gender: form.gender,
            address: form.address,
            purok: form.purok,
            contact: form.contact,
            civil_status: form.civil_status,
            role: "resident"
          })
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.msg || "Signup failed");
        setLoading(false);
        return;
      }

      alert(data.msg || "Account created successfully");
      navigate("/login");

    } catch (err) {
      console.log(err);
      setError("Server not reachable");
    }

    setLoading(false);
  };

  return (
    <div style={container}>
      <div style={card}>
        <h2 style={title}>Create Resident Account</h2>
        <p style={subtitle}>Sign up to access the system</p>

        <input style={input} placeholder="Full Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input style={input} placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input type="password" style={input} placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        {/* NEW FIELDS */}

        <input type="date" style={input}placeholder="Birthday"
          value={form.birthdate}
          onChange={(e) => setForm({ ...form, birthdate: e.target.value })}
        />

        <select style={input}
          value={form.gender}
          onChange={(e) => setForm({ ...form, gender: e.target.value })}
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <input style={input} placeholder="Address"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />

        <input style={input} placeholder="Purok"
          value={form.purok}
          onChange={(e) => setForm({ ...form, purok: e.target.value })}
        />

        <input style={input} placeholder="Contact Number"
          value={form.contact}
          onChange={(e) => setForm({ ...form, contact: e.target.value })}
        />

        <select style={input}
          value={form.civil_status}
          onChange={(e) => setForm({ ...form, civil_status: e.target.value })}
        >
          <option value="">Civil Status</option>
          <option value="Single">Single</option>
          <option value="Married">Married</option>
          <option value="Widowed">Widowed</option>
          <option value="Divorced">Divorced</option>
        </select>

        {error && <p style={errorText}>{error}</p>}

        <button onClick={handleSignup} style={btn} disabled={loading}>
          {loading ? "Creating..." : "Create Account"}
        </button>

        <p style={loginText}>
          Already have an account?{" "}
          <span style={loginLink} onClick={() => navigate("/login")}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;

/* ================= STYLES ================= */

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

const title = { marginBottom: "5px", color: "#111827" };
const subtitle = { fontSize: "12px", color: "#6b7280", marginBottom: "20px" };

const input = {
  width: "100%",
  padding: "12px",
  marginBottom: "10px",
  borderRadius: "8px",
  border: "1px solid #d1d5db",
  outline: "none",
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

const loginText = {
  marginTop: "15px",
  fontSize: "13px",
  color: "#6b7280"
};

const loginLink = {
  color: "#2563eb",
  cursor: "pointer",
  fontWeight: "bold"
};