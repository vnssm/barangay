import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const Residents = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  const [residents, setResidents] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  /* =========================
     FETCH DATABASE
  ========================= */
  useEffect(() => {
    const fetchResidents = async () => {
      try {
        const res = await fetch(
          "http://localhost/1/makaballa/barangay-backend/get_residents.php"
        );

        const data = await res.json();
        setResidents(data || []);
      } catch (err) {
        console.log(err);
      }

      setLoading(false);
    };

    fetchResidents();
  }, []);

  /* =========================
     SEARCH FILTER
  ========================= */
  const filteredResidents = residents.filter((r) =>
    (r.full_name || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div style={{ paddingBottom: "40px" }}>

      {/* HEADER (same design) */}
      <div style={headerStyle}>
        <h2>Resident Records</h2>

        {isAdmin && (
          <button style={addButton}>
            + Add Resident
          </button>
        )}
      </div>

      {/* SEARCH (same design) */}
      <input
        type="text"
        placeholder="Search resident..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={searchInput}
      />

      {/* LOADING */}
      {loading && <p style={{ marginTop: "10px" }}>Loading...</p>}

      {/* TABLE */}
      {!loading && (
        <div style={tableContainer}>
          <table style={tableStyle}>

            <thead>
              <tr>
                <th>Name</th>
                <th>Purok</th>
                <th>Contact</th>
                {isAdmin && <th>Actions</th>}
              </tr>
            </thead>

            <tbody>
              {filteredResidents.map((r) => (
                <tr key={r.id}>

                  {/* FULL NAME */}
                  <td>{r.full_name}</td>

                  {/* PUROK */}
                  <td>{r.purok}</td>

                  {/* CONTACT */}
                  <td>{r.contact}</td>

                  {/* ADMIN ACTIONS */}
                  {isAdmin && (
                    <td>
                      <button style={editBtn}>Edit</button>
                      <button style={deleteBtn}>Delete</button>
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

export default Residents;

/* ================= STYLES (UNCHANGED DESIGN) ================= */

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "20px"
};

const addButton = {
  background: "#2563eb",
  color: "white",
  border: "none",
  padding: "10px 16px",
  borderRadius: "8px",
  cursor: "pointer"
};

const searchInput = {
  width: "100%",
  padding: "10px",
  marginBottom: "20px",
  borderRadius: "8px",
  border: "1px solid #ccc"
};

const tableContainer = {
  background: "#fff",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse"
};

const editBtn = {
  marginRight: "10px",
  padding: "6px 10px",
  border: "none",
  background: "#10b981",
  color: "white",
  borderRadius: "6px",
  cursor: "pointer"
};

const deleteBtn = {
  padding: "6px 10px",
  border: "none",
  background: "#ef4444",
  color: "white",
  borderRadius: "6px",
  cursor: "pointer"
};