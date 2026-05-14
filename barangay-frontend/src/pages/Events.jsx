import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { FaTrash, FaPlus } from "react-icons/fa";

const Events = () => {
  const { user } = useAuth();
  const role = user?.role || "guest";

  const isAdmin = role === "admin";

  const [tab, setTab] = useState("events");

  // ================= DATA =================
  const [events, setEvents] = useState([
    { id: 1, title: "Clean-up Drive", date: "2026-05-10", status: "Upcoming" }
  ]);

  const [announcements, setAnnouncements] = useState([
    { id: 1, title: "Road Closure", message: "Main road repair", date: "2026-05-08" }
  ]);

  // ================= ADMIN ACTIONS =================
  const addEvent = () => {
    const title = prompt("Event Title:");
    const date = prompt("Date (YYYY-MM-DD):");

    if (!title || !date) return;

    setEvents([
      ...events,
      {
        id: Date.now(),
        title,
        date,
        status: "Upcoming"
      }
    ]);
  };

  const addAnnouncement = () => {
    const title = prompt("Announcement Title:");
    const message = prompt("Message:");

    if (!title || !message) return;

    setAnnouncements([
      ...announcements,
      {
        id: Date.now(),
        title,
        message,
        date: new Date().toLocaleDateString()
      }
    ]);
  };

  const deleteEvent = (id) => {
    setEvents(events.filter((e) => e.id !== id));
  };

  const deleteAnnouncement = (id) => {
    setAnnouncements(announcements.filter((a) => a.id !== id));
  };

  return (
    <div style={page}>
      <h2>Events & Announcements</h2>

      {/* TABS */}
      <div style={tabs}>
        <button onClick={() => setTab("events")} style={tabBtn}>
          Events
        </button>

        <button onClick={() => setTab("announcements")} style={tabBtn}>
          Announcements
        </button>
      </div>

      {/* ADMIN BUTTONS ONLY */}
      {isAdmin && (
        <div style={{ marginBottom: "10px" }}>
          <button
            style={addBtn}
            onClick={tab === "events" ? addEvent : addAnnouncement}
          >
            <FaPlus /> Add {tab === "events" ? "Event" : "Announcement"}
          </button>
        </div>
      )}

      {/* ================= EVENTS ================= */}
      {tab === "events" && (
        <div style={card}>
          <table style={table}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Date</th>
                <th>Status</th>
                {isAdmin && <th>Action</th>}
              </tr>
            </thead>

            <tbody>
              {events.map((e) => (
                <tr key={e.id}>
                  <td>{e.title}</td>
                  <td>{e.date}</td>
                  <td>
                    <span style={badge(e.status)}>{e.status}</span>
                  </td>

                  {isAdmin && (
                    <td>
                      <button
                        onClick={() => deleteEvent(e.id)}
                        style={delBtn}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ================= ANNOUNCEMENTS ================= */}
      {tab === "announcements" && (
        <div style={card}>
          <table style={table}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Message</th>
                <th>Date</th>
                {isAdmin && <th>Action</th>}
              </tr>
            </thead>

            <tbody>
              {announcements.map((a) => (
                <tr key={a.id}>
                  <td>{a.title}</td>
                  <td>{a.message}</td>
                  <td>{a.date}</td>

                  {isAdmin && (
                    <td>
                      <button
                        onClick={() => deleteAnnouncement(a.id)}
                        style={delBtn}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Events;

/* ================= STYLES ================= */

const page = {
  padding: "20px",
  background: "#f5f6fa"
};

const tabs = {
  display: "flex",
  gap: "10px",
  marginBottom: "10px"
};

const tabBtn = {
  padding: "8px 12px",
  border: "1px solid #ddd",
  background: "white",
  borderRadius: "6px",
  cursor: "pointer"
};

const addBtn = {
  padding: "10px 12px",
  background: "#2c3e50",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer"
};

const card = {
  background: "white",
  padding: "15px",
  borderRadius: "10px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.06)"
};

const table = {
  width: "100%",
  borderCollapse: "collapse"
};

const badge = (status) => ({
  padding: "4px 10px",
  borderRadius: "20px",
  fontSize: "12px",
  color: "white",
  background:
    status === "Completed"
      ? "#27ae60"
      : status === "Ongoing"
      ? "#f39c12"
      : "#3498db"
});

const delBtn = {
  background: "#e74c3c",
  color: "white",
  border: "none",
  padding: "5px 8px",
  borderRadius: "6px",
  cursor: "pointer"
};