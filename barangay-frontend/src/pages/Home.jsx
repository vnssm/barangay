import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const isLoggedIn = !!user;

  return (
    <div style={page}>
      {/* NAVBAR */}
      <div style={nav}>
        <h2 style={logo}>Barangay System</h2>

        <button
          style={navBtn}
          onClick={() => navigate(isLoggedIn ? "/dashboard" : "/login")}
        >
          {isLoggedIn ? "Dashboard" : "Login"}
        </button>
      </div>

      {/* MAIN CONTAINER */}
      <div style={container}>
        {/* HERO */}
        <div style={heroWrapper}>
          <div style={heroCard}>
            <h1 style={title}>Barangay Management System</h1>

            <p style={subtitle}>
              A modern digital platform for transparent governance, fast services,
              and efficient community management.
            </p>

            <div style={btnGroup}>
              {!isLoggedIn ? (
                <button style={primaryBtn} onClick={() => navigate("/login")}>
                  Get Started
                </button>
              ) : (
                <button style={primaryBtn} onClick={() => navigate("/dashboard")}>
                  Go to Dashboard
                </button>
              )}
            </div>
          </div>
        </div>

        {/* FEATURES */}
        <div style={grid}>
          <div style={card}>
            <h3>📄 Certificates</h3>
            <p>Request barangay clearances and documents online.</p>
          </div>

          <div style={card}>
            <h3>⚠️ Complaints</h3>
            <p>Report issues and track status easily.</p>
          </div>

          <div style={card}>
            <h3>📅 Appointments</h3>
            <p>Book schedules with barangay officials.</p>
          </div>

          <div style={card}>
            <h3>📢 Announcements</h3>
            <p>Stay updated with community news and events.</p>
          </div>
        </div>

        <div style={footer}>© 2026 Barangay Management System</div>
      </div>
    </div>
  );
};

export default Home;

/* ================= PAGE ================= */

const page = {
  fontFamily: "Arial",
  background: "#f5f7fb",
  minHeight: "100vh",
};

/* ================= NAVBAR (ONLY BLUE PART) ================= */

const nav = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "18px 25px",
  background: "#1e3a8a", // ONLY BLUE HERE
  color: "white",
  position: "sticky",
  top: 0,
  boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
};

const logo = {
  fontSize: "18px",
  fontWeight: "bold",
  color: "white",
};

const navBtn = {
  padding: "8px 14px",
  borderRadius: "10px",
  border: "none",
  background: "white",
  color: "#1e3a8a",
  cursor: "pointer",
  fontWeight: "bold",
};

/* ================= LAYOUT ================= */

const container = {
  maxWidth: "1000px",
  margin: "0 auto",
  padding: "0 20px",
};

/* ================= HERO ================= */

const heroWrapper = {
  padding: "40px 0",
  display: "flex",
  justifyContent: "center",
};

const heroCard = {
  width: "100%",
  maxWidth: "900px",
  textAlign: "center",
  padding: "60px 35px",
  borderRadius: "24px",
  background: "white",
  boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
};

const title = {
  fontSize: "40px",
  fontWeight: "bold",
  color: "#1f2937",
  marginBottom: "12px",
};

const subtitle = {
  fontSize: "15px",
  color: "#6b7280",
  maxWidth: "650px",
  margin: "0 auto 20px auto",
  lineHeight: "1.6",
};

const btnGroup = {
  display: "flex",
  justifyContent: "center",
  gap: "12px",
};

const primaryBtn = {
  padding: "12px 20px",
  background: "#1e3a8a",
  color: "white",
  border: "none",
  borderRadius: "12px",
  cursor: "pointer",
  fontWeight: "bold",
};

/* ================= FEATURES ================= */

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "20px",
  padding: "35px 0",
};

const card = {
  background: "white",
  padding: "22px",
  borderRadius: "18px",
  boxShadow: "0 8px 18px rgba(0,0,0,0.06)",
  border: "1px solid #e5e7eb",
};

/* ================= FOOTER ================= */

const footer = {
  textAlign: "center",
  padding: "20px",
  fontSize: "13px",
  color: "#6b7280",
};