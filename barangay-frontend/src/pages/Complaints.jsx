import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const API = "http://localhost/1/makaballa/barangay-backend";

const Complaints = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ complaint: "" });

  /* ================= FETCH ================= */
  const fetchComplaints = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${API}/complaints_get.php`);
      const data = await res.json();

      setComplaints(data.complaints || []);
    } catch (err) {
      console.log("Fetch error:", err);
      setComplaints([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  /* ================= SUBMIT COMPLAINT ================= */
  const submitComplaint = async () => {
    if (!form.complaint.trim()) return;

    try {
      await fetch(`${API}/complaints_create.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user?.id,
          complaint: form.complaint
        })
      });

      setForm({ complaint: "" });
      fetchComplaints();
    } catch (err) {
      console.log("Submit error:", err);
    }
  };

  /* ================= ADMIN ACTION ================= */
  const updateStatus = async (id, status) => {
    try {
      await fetch(`${API}/complaints_update.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status })
      });

      fetchComplaints();
    } catch (err) {
      console.log("Update error:", err);
    }
  };

  /* ================= UI ================= */
  if (loading) {
    return <div style={page}>Loading complaints...</div>;
  }

  return (
    <div style={page}>
      <h2>Complaints</h2>

      {/* ================= RESIDENT FORM ================= */}
      {!isAdmin && (
        <div style={card}>
          <h3>Submit Complaint</h3>

          <textarea
            style={input}
            placeholder="Write your complaint..."
            value={form.complaint}
            onChange={(e) =>
              setForm({ ...form, complaint: e.target.value })
            }
          />

          <button style={btn} onClick={submitComplaint}>
            Submit
          </button>
        </div>
      )}

      {/* ================= TABLE ================= */}
      <div style={card}>
        <table style={table}>
          <thead>
            <tr>
              <th>Resident</th>
              <th>Complaint</th>
              <th>Status</th>
              {isAdmin && <th>Action</th>}
            </tr>
          </thead>

          <tbody>
            {complaints.length === 0 ? (
              <tr>
                <td colSpan="4">No complaints found</td>
              </tr>
            ) : (
              complaints.map((c) => (
                <tr key={c.id}>
                  <td>{c.name}</td>
                  <td>{c.complaint}</td>
                  <td>{c.status}</td>

                  {isAdmin && (
                    <td>
                      <button
                        style={approveBtn}
                        onClick={() => updateStatus(c.id, "Approved")}
                      >
                        Approve
                      </button>

                      <button
                        style={rejectBtn}
                        onClick={() => updateStatus(c.id, "Rejected")}
                      >
                        Reject
                      </button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Complaints;

/* ================= STYLES ================= */

const page = {
  padding: "20px",
  background: "#f5f6fa"
};

const card = {
  background: "white",
  padding: "15px",
  borderRadius: "10px",
  marginBottom: "15px"
};

const input = {
  width: "100%",
  minHeight: "80px",
  padding: "10px",
  marginBottom: "10px"
};

const btn = {
  padding: "10px 15px",
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "6px"
};

const table = {
  width: "100%",
  borderCollapse: "collapse"
};

const approveBtn = {
  background: "#16a34a",
  color: "white",
  border: "none",
  padding: "5px 10px",
  marginRight: "5px"
};

const rejectBtn = {
  background: "#dc2626",
  color: "white",
  border: "none",
  padding: "5px 10px"
};