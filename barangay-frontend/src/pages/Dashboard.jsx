import React, { useEffect, useState, useCallback } from "react";
import { useAuth } from "../context/AuthContext";

const API = "http://localhost/1/makaballa/barangay-backend";

const Dashboard = () => {
  const { user } = useAuth();
  const role = user?.role || "guest";

  const [stats, setStats] = useState({
    residents: 0,
    requests: 0,
    complaints: 0,
    events: 0
  });

  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  // ================= FETCH =================
  const fetchDashboard = useCallback(async () => {
    try {
      if (!user) return;

      let url = "";

      // 🔥 ROLE-BASED ENDPOINT
      if (role === "admin") {
        url = `${API}/dashboard_admin.php`;
      } else {
        url = `${API}/dashboard_resident.php?user_id=${user.id}`;
      }

      const res = await fetch(url);
      const data = await res.json();

      setStats({
        residents: data.stats?.residents ?? 0,
        requests: data.stats?.requests ?? 0,
        complaints: data.stats?.complaints ?? 0,
        events: data.stats?.events ?? 0
      });

      setRecent(data.recent || []);
    } catch (err) {
      console.log("Dashboard error:", err);
    } finally {
      setLoading(false);
    }
  }, [user, role]);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  // 🔥 REAL-TIME
  useEffect(() => {
    if (!user) return;

    const interval = setInterval(fetchDashboard, 5000);
    return () => clearInterval(interval);
  }, [fetchDashboard, user]);

  if (!user) {
    return <div style={{ padding: 20 }}>Please login</div>;
  }

  if (loading) {
    return <div style={{ padding: 20 }}>Loading...</div>;
  }

  return (
    <div style={styles.page}>
      <h2>{role === "admin" ? "Admin Dashboard" : "Resident Dashboard"}</h2>

      {/* ================= STATS ================= */}
      <div style={styles.grid}>

        {/* ADMIN ONLY */}
        {role === "admin" && (
          <div style={styles.card}>
            <h3>Residents</h3>
            <h2>{stats.residents}</h2>
          </div>
        )}

        <div style={styles.card}>
          <h3>{role === "admin" ? "Total Requests" : "My Requests"}</h3>
          <h2>{stats.requests}</h2>
        </div>

        <div style={styles.card}>
          <h3>{role === "admin" ? "Total Complaints" : "My Complaints"}</h3>
          <h2>{stats.complaints}</h2>
        </div>

        <div style={styles.card}>
          <h3>Events</h3>
          <h2>{stats.events}</h2>
        </div>
      </div>

      {/* ================= RECENT ================= */}
      <div style={styles.tableCard}>
        <h3>{role === "admin" ? "System Activity" : "My Activity"}</h3>

        <table style={styles.table}>
          <thead>
            <tr>
              {role === "admin" && <th>Name</th>}
              <th>Action</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {recent.length === 0 ? (
              <tr>
                <td colSpan={role === "admin" ? 3 : 2}>No activity</td>
              </tr>
            ) : (
              recent.map((r, i) => (
                <tr key={i}>
                  {role === "admin" && <td>{r.name}</td>}
                  <td>{r.action}</td>
                  <td>{r.date}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;

/* ================= STYLES ================= */
const styles = {
  page: { padding: "20px", background: "#f5f6fa" },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "15px",
    marginBottom: "20px"
  },

  card: {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)"
  },

  tableCard: {
    background: "white",
    padding: "20px",
    borderRadius: "10px"
  },

  table: {
    width: "100%",
    borderCollapse: "collapse"
  }
};