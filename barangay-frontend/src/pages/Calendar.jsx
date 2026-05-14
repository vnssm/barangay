import React, { useEffect, useState } from "react";

const API = "http://localhost/1/makaballa/barangay-backend";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // ================= FETCH EVENTS (SAFE) =================
  const fetchEvents = async () => {
    try {
      const res = await fetch(`${API}/event_get.php`);
      const data = await res.json();

      if (Array.isArray(data)) {
        setEvents(data);
      } else {
        console.warn("Invalid API response:", data);
        setEvents([]);
      }
    } catch (err) {
      console.log("Fetch error:", err);
      setEvents([]);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // ================= AUTO REFRESH (REAL-TIME STYLE) =================
  useEffect(() => {
    const interval = setInterval(() => {
      fetchEvents();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // ================= FORMAT DATE =================
  const formatDate = (day) => {
    const m = String(month + 1).padStart(2, "0");
    const d = String(day).padStart(2, "0");
    return `${year}-${m}-${d}`;
  };

  // ================= SAFE EVENTS ARRAY =================
  const safeEvents = Array.isArray(events) ? events : [];

  // ================= GROUP EVENTS BY DATE =================
  const eventMap = safeEvents.reduce((acc, ev) => {
    if (!ev?.event_date) return acc;

    if (!acc[ev.event_date]) {
      acc[ev.event_date] = [];
    }

    acc[ev.event_date].push(ev.title);

    return acc;
  }, {});

  // ================= BUILD CALENDAR GRID =================
  const dates = [];

  for (let i = 0; i < firstDay; i++) {
    dates.push(null);
  }

  for (let d = 1; d <= totalDays; d++) {
    dates.push(d);
  }

  return (
    <div style={styles.page}>
      
      {/* HEADER */}
      <div style={styles.header}>
        <button onClick={() => setCurrentDate(new Date(year, month - 1))}>
          ◀
        </button>

        <h2>
          {currentDate.toLocaleString("default", { month: "long" })} {year}
        </h2>

        <button onClick={() => setCurrentDate(new Date(year, month + 1))}>
          ▶
        </button>
      </div>

      {/* DAYS */}
      <div style={styles.grid}>
        {days.map((d) => (
          <div key={d} style={styles.dayBox}>
            {d}
          </div>
        ))}

        {/* CALENDAR CELLS */}
        {dates.map((day, index) => {
          const key = day ? formatDate(day) : null;

          return (
            <div key={index} style={styles.cell}>
              {day && (
                <>
                  <div style={styles.dateNumber}>{day}</div>

                  {(eventMap[key] || []).map((event, i) => (
                    <div key={i} style={styles.event}>
                      • {event}
                    </div>
                  ))}
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;

/* ================= STYLES ================= */

const styles = {
  page: {
    padding: "20px",
    background: "#f5f6fa"
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: "5px"
  },

  dayBox: {
    background: "#2c3e50",
    color: "white",
    textAlign: "center",
    padding: "10px",
    borderRadius: "6px",
    fontWeight: "bold"
  },

  cell: {
    minHeight: "90px",
    background: "white",
    border: "1px solid #e5e7eb",
    padding: "5px",
    borderRadius: "6px",
    fontSize: "12px"
  },

  dateNumber: {
    fontWeight: "bold",
    marginBottom: "5px"
  },

  event: {
    fontSize: "11px",
    color: "#2563eb",
    marginTop: "2px"
  }
};