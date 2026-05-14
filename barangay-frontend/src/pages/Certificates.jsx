import React, { useState, useEffect, useCallback } from "react";
import { FaPrint, FaCheck, FaTimes, FaUpload, FaFileAlt } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const Certificates = () => {
  const { user } = useAuth();
  const role = user?.role || "guest";

  const [requests, setRequests] = useState([]);
  const [showReason, setShowReason] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [reason, setReason] = useState("");

  // ================= FETCH FROM DATABASE =================
  const fetchRequests = useCallback(async () => {
    try {
      const res = await fetch(
        "http://localhost/1/makaballa/barangay-backend/certificates_get.php"
      );

      const data = await res.json();
      setRequests(Array.isArray(data) ? data : []);
    } catch (err) {
      console.log("Fetch error:", err);
      setRequests([]);
    }
  }, []);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  // ================= PRINT =================
  const printPage = () => window.print();

  const printRow = (item) => {
    const win = window.open("", "", "width=600,height=600");
    win.document.write(`
      <pre>
Barangay Certificate Request

Resident: ${item.resident}
Type: ${item.type}
Purpose: ${item.purpose}
Date: ${item.date}
Status: ${item.status}
      </pre>
    `);
    win.print();
  };

  // ================= ADMIN ACTIONS =================
  const approve = async (id) => {
    try {
      await fetch(
        "http://localhost/1/makaballa/barangay-backend/certificates_update_status.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, status: "Approved" }),
        }
      );

      fetchRequests();
    } catch (err) {
      console.log(err);
    }
  };

  const openDecline = (id) => {
    setSelectedId(id);
    setShowReason(true);
  };

  const submitDecline = async () => {
    try {
      await fetch(
        "http://localhost/1/makaballa/barangay-backend/certificates_update_status.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: selectedId,
            status: "Declined",
            reason,
          }),
        }
      );

      setReason("");
      setShowReason(false);
      fetchRequests();
    } catch (err) {
      console.log(err);
    }
  };

  // ================= RESIDENT VIEW =================
  if (role === "resident") {
    return (
      <div>
        <h2>Request Certificate</h2>

        {/* REQUEST FORM */}
        <div style={box}>
          <h3>Submit Request</h3>

          <select style={input}>
            <option>Barangay Clearance</option>
            <option>Certificate of Residency</option>
            <option>Indigency</option>
          </select>

          <input placeholder="Purpose" style={input} />

          <button style={btn}>
            <FaFileAlt /> Submit Request
          </button>
        </div>

        {/* TABLE */}
        <h3>My Requests</h3>

        <table style={table}>
          <thead>
            <tr>
              <th>Type</th>
              <th>Purpose</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((r) => (
              <tr key={r.id}>
                <td>{r.type}</td>
                <td>{r.purpose}</td>
                <td>{r.date}</td>
                <td>{r.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // ================= ADMIN VIEW =================
  return (
    <div>
      <div style={header}>
        <h2>Issuance Requests</h2>

        <button onClick={printPage} style={btn}>
          <FaPrint /> Print Page
        </button>
      </div>

      {/* TEMPLATE UPLOAD */}
      <div style={box}>
        <h4>Certificate Templates</h4>

        <input type="file" />

        <button style={uploadBtn}>
          <FaUpload /> Upload
        </button>
      </div>

      {/* TABLE */}
      <table style={table}>
        <thead>
          <tr>
            <th>Resident</th>
            <th>Type</th>
            <th>Purpose</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {requests.map((r) => (
            <tr key={r.id}>
              <td>{r.resident}</td>
              <td>{r.type}</td>
              <td>{r.purpose}</td>
              <td>{r.date}</td>
              <td>{r.status}</td>
              <td>
                <button onClick={() => approve(r.id)} style={okBtn}>
                  <FaCheck />
                </button>

                <button onClick={() => openDecline(r.id)} style={noBtn}>
                  <FaTimes />
                </button>

                <button onClick={() => printRow(r)} style={smallBtn}>
                  <FaPrint />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* DECLINE MODAL */}
      {showReason && (
        <div style={overlay}>
          <div style={modal}>
            <h3>Decline Request</h3>

            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              style={textarea}
            />

            <button onClick={submitDecline} style={btn}>
              Submit
            </button>

            <button onClick={() => setShowReason(false)} style={cancel}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Certificates;

/* ================= STYLES ================= */

const header = { display: "flex", justifyContent: "space-between" };

const box = { padding: "15px", background: "#f3f4f6", marginBottom: "15px" };

const input = { width: "100%", padding: "8px", margin: "5px 0" };

const table = { width: "100%", marginTop: "10px", borderCollapse: "collapse" };

const btn = { padding: "8px 12px", background: "#2563eb", color: "#fff", border: "none" };

const uploadBtn = { marginLeft: "10px", background: "green", color: "#fff", border: "none" };

const smallBtn = { margin: "2px", padding: "5px" };

const okBtn = { background: "green", color: "white", border: "none" };

const noBtn = { background: "red", color: "white", border: "none" };

const overlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modal = { background: "white", padding: "20px" };

const textarea = { width: "100%", height: "80px" };

const cancel = { background: "gray", color: "white", border: "none", marginLeft: "10px" };