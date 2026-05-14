import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import {
  FaHome,
  FaUsers,
  FaFileAlt,
  FaExclamationTriangle,
  FaBell,
  FaCommentDots,
  FaCalendarAlt,
  FaBox,
  FaCog
} from "react-icons/fa";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { user } = useAuth();

  // ================= ADMIN MENU (FULL ACCESS) =================
  const adminMenu = [
    { title: "Dashboard", icon: <FaHome />, path: "/dashboard" },
    { title: "Resident Records", icon: <FaUsers />, path: "/residents" },
    { title: "Certificates", icon: <FaFileAlt />, path: "/certificates" },
    { title: "Complaint Appointments", icon: <FaExclamationTriangle />, path: "/complaints" },
    { title: "Events", icon: <FaBell />, path: "/events" },
    { title: "Posts", icon: <FaCommentDots />, path: "/posts" },
    { title: "Calendar", icon: <FaCalendarAlt />, path: "/calendar" },
    { title: "Inventory", icon: <FaBox />, path: "/inventory" },
    { title: "Settings", icon: <FaCog />, path: "/settings" }
  ];

  // ================= RESIDENT MENU (LIMITED ACCESS) =================
  const residentMenu = [
    { title: "Dashboard", icon: <FaHome />, path: "/dashboard" },
    { title: "Resident Register", icon: <FaUsers />, path: "/residents" },
    { title: "Request Certificate", icon: <FaFileAlt />, path: "/certificates" },
    { title: "Request Complaint Appointment", icon: <FaExclamationTriangle />, path: "/complaints" },
    { title: "Announcements", icon: <FaBell />, path: "/events" },
    { title: "Community Posts", icon: <FaCommentDots />, path: "/posts" },
    { title: "Calendar", icon: <FaCalendarAlt />, path: "/calendar" },
    { title: "Request Equipment", icon: <FaBox />, path: "/inventory" },
    { title: "Settings", icon: <FaCog />, path: "/settings" }
  ];

  // ================= ROLE SWITCH =================
  const menuToShow =
  user?.role === "admin"
    ? adminMenu
    : user?.role === "resident"
    ? residentMenu
    : [
      { title: "Dashboard", icon: <FaHome />, path: "/dashboard" },
      { title: "Announcements", icon: <FaBell />, path: "/events" }
    ];

  return (
    <div style={sidebar(isOpen)}>

    <div style={header}>
      <NavLink
        to="/"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          textDecoration: "none",
          color: "inherit"
        }}
    >
      <div style={logoBox}>🏠</div>
      <h2 style={{ margin: 0, cursor: "pointer" }}>Barangay</h2>
    </NavLink>
  </div>

      {/* MENU */}
      <nav style={{ flex: 1, padding: "10px", overflowY: "auto" }}>
        <ul style={{ listStyle: "none", padding: 0 }}>

          {menuToShow.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.path}
                onClick={() => setIsOpen(false)}
                style={({ isActive }) => ({
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px",
                  borderRadius: "8px",
                  textDecoration: "none",
                  color: isActive ? "#fff" : "#d1d5db",
                  background: isActive ? "#2563eb" : "transparent"
                })}
              >
                {item.icon}
                {item.title}
              </NavLink>
            </li>
          ))}

        </ul>
      </nav>

      {/* FOOTER */}
      <div style={footer}>
        Logged in as: <b>{user?.role?.toUpperCase()}</b>
      </div>

    </div>
  );
};

export default Sidebar;

/* ================= STYLES ================= */

const sidebar = (isOpen) => ({
  width: "260px",
  height: "100vh",
  backgroundColor: "#111827",
  color: "#ffffff",
  position: "fixed",
  top: 0,
  left: 0,
  transform: isOpen ? "translateX(0)" : "translateX(-100%)",
  transition: "transform 0.3s ease",
  zIndex: 1000,
  display: "flex",
  flexDirection: "column",
  boxShadow: "4px 0 15px rgba(0,0,0,0.3)"
});

const header = {
  padding: "20px",
  borderBottom: "1px solid #374151",
  display: "flex",
  alignItems: "center",
  gap: "10px"
};

const logoBox = {
  width: "40px",
  height: "40px",
  background: "#3b82f6",
  borderRadius: "8px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};

const footer = {
  padding: "15px",
  borderTop: "1px solid #374151",
  fontSize: "12px",
  color: "#9ca3af"
};