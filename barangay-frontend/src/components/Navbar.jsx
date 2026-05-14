import React, { useState } from "react";
import { FaBars, FaBell, FaUserCircle } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = ({ setIsOpen, onBellClick }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [openProfile, setOpenProfile] = useState(false);

  const handleLogout = () => {
    logout();          // clear auth state
    navigate("/");     // redirect to login
  };

  return (
    <div style={navBar}>

      {/* LEFT */}
      <div style={left}>
        <button onClick={() => setIsOpen(prev => !prev)} style={menuBtn}>
          <FaBars />
        </button>

        <h3 style={{ margin: 0 }}>
          Barangay Management System
        </h3>
      </div>

      {/* RIGHT */}
      <div style={right}>

        {/* PROFILE */}
        <div style={{ position: "relative" }}>
          <div
            style={iconWrapper}
            onClick={() => setOpenProfile(!openProfile)}
          >
            <FaUserCircle />
          </div>

          {openProfile && (
            <div style={dropdown}>
              <p style={{ margin: 0 }}>
                <b>{user?.name || "Guest"}</b>
              </p>

              <p style={{ margin: "5px 0", fontSize: "12px" }}>
                Role: {user?.role ? user.role.toUpperCase() : "N/A"}
              </p>

              <hr />

              <button style={logoutBtn} onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>

        {/* NOTIFICATIONS */}
        <div style={iconWrapper} onClick={onBellClick}>
          <FaBell />
          <span style={dot}></span>
        </div>

      </div>
    </div>
  );
};

export default Navbar;

/* ================= STYLES ================= */

const navBar = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 20px",
  background: "#2c3e50",
  color: "white"
};

const left = {
  display: "flex",
  alignItems: "center",
  gap: "10px"
};

const right = {
  display: "flex",
  alignItems: "center",
  gap: "12px"
};

const menuBtn = {
  background: "none",
  border: "none",
  color: "white",
  cursor: "pointer",
  fontSize: "20px"
};

const iconWrapper = {
  position: "relative",
  cursor: "pointer",
  padding: "8px",
  borderRadius: "50%",
  background: "rgba(255,255,255,0.1)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};

const dropdown = {
  position: "absolute",
  right: 0,
  top: "40px",
  background: "white",
  color: "black",
  padding: "10px",
  borderRadius: "8px",
  width: "160px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
  zIndex: 999
};

const logoutBtn = {
  width: "100%",
  padding: "6px",
  background: "red",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer"
};

const dot = {
  position: "absolute",
  top: "5px",
  right: "5px",
  width: "8px",
  height: "8px",
  background: "red",
  borderRadius: "50%"
};