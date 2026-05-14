import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Settings = () => {
  const { user } = useAuth();
  const role = user?.role || "guest";

  const [profile, setProfile] = useState({
    name: user?.name || "",
    email: "",
    password: ""
  });

  const [systemSettings, setSystemSettings] = useState({
    barangayName: "Barangay System",
    contactNumber: "",
    maintenanceMode: false
  });

  const saveProfile = () => {
    alert("Profile updated successfully!");
  };

  const saveSystem = () => {
    alert("System settings updated!");
  };

  return (
    <div style={page}>
      <h2>Settings</h2>

      {role === "resident" && (
        <div style={card}>
          <h3>My Account</h3>

          <label>Name</label>
          <input
            style={input}
            value={profile.name}
            onChange={(e) =>
              setProfile({ ...profile, name: e.target.value })
            }
          />

          <label>Email</label>
          <input
            style={input}
            value={profile.email}
            onChange={(e) =>
              setProfile({ ...profile, email: e.target.value })
            }
          />

          <label>Password</label>
          <input
            type="password"
            style={input}
            value={profile.password}
            onChange={(e) =>
              setProfile({ ...profile, password: e.target.value })
            }
          />

          <button style={btn} onClick={saveProfile}>
            Save Profile
          </button>
        </div>
      )}

      {role === "admin" && (
        <div style={card}>
          <h3>System Settings</h3>

          <label>Barangay Name</label>
          <input
            style={input}
            value={systemSettings.barangayName}
            onChange={(e) =>
              setSystemSettings({
                ...systemSettings,
                barangayName: e.target.value
              })
            }
          />

          <label>Contact Number</label>
          <input
            style={input}
            value={systemSettings.contactNumber}
            onChange={(e) =>
              setSystemSettings({
                ...systemSettings,
                contactNumber: e.target.value
              })
            }
          />

          <label>
            <input
              type="checkbox"
              checked={systemSettings.maintenanceMode}
              onChange={(e) =>
                setSystemSettings({
                  ...systemSettings,
                  maintenanceMode: e.target.checked
                })
              }
            />
            Enable Maintenance Mode
          </label>

          <br /><br />

          <button style={btn} onClick={saveSystem}>
            Save System Settings
          </button>
        </div>
      )}

      {role !== "admin" && role !== "resident" && (
        <div style={card}>
          <p>You do not have access to settings.</p>
        </div>
      )}
    </div>
  );
};

export default Settings;

/* ORIGINAL STYLE */
const page = {
  padding: "20px",
  background: "#f5f6fa"
};

const card = {
  background: "white",
  padding: "20px",
  borderRadius: "10px",
  marginBottom: "15px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
};

const input = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  border: "1px solid #ddd",
  borderRadius: "6px"
};

const btn = {
  padding: "10px",
  background: "#2c3e50",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};