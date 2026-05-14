import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { FaCheck, FaTimes, FaUndo, FaEdit, FaTrash } from "react-icons/fa";

const Inventory = () => {
  const { user } = useAuth();
  const role = user?.role || "guest";

  const isResident = role === "resident";

  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  const [inventory, setInventory] = useState([
    { id: 1, name: "Bond Paper", total: 100, available: 100, inUse: 0 },
    { id: 2, name: "Chairs", total: 50, available: 50, inUse: 0 }
  ]);

  const [requests, setRequests] = useState([]);

  const [itemForm, setItemForm] = useState({ name: "", total: 0 });
  const [requestForm, setRequestForm] = useState({
    item: "",
    quantity: 1,
    purpose: ""
  });

  /* ================= INVENTORY ================= */

  const saveItem = () => {
    if (!itemForm.name || !itemForm.total) return;

    if (editMode) {
      setInventory((prev) =>
        prev.map((item) =>
          item.id === editId
            ? { ...item, name: itemForm.name, total: itemForm.total }
            : item
        )
      );
    } else {
      setInventory((prev) => [
        ...prev,
        {
          id: Date.now(),
          name: itemForm.name,
          total: itemForm.total,
          available: itemForm.total,
          inUse: 0
        }
      ]);
    }

    setItemForm({ name: "", total: 0 });
    setEditMode(false);
    setEditId(null);
    setShowForm(false);
  };

  const openEdit = (item) => {
    setItemForm({ name: item.name, total: item.total });
    setEditMode(true);
    setEditId(item.id);
    setShowForm(true);
  };

  const deleteItem = (id) => {
    setInventory((prev) => prev.filter((i) => i.id !== id));
  };

  /* ================= REQUEST ================= */

  const createRequest = () => {
    if (!requestForm.item || !requestForm.quantity) return;

    setRequests((prev) => [
      ...prev,
      {
        id: Date.now(),
        requester: user?.name,
        ...requestForm,
        status: "Pending",
        date: new Date().toLocaleDateString()
      }
    ]);

    setRequestForm({ item: "", quantity: 1, purpose: "" });
    setShowForm(false);
  };

  const approveRequest = (req) => {
    setInventory((prev) =>
      prev.map((item) =>
        item.name === req.item
          ? {
              ...item,
              available: item.available - req.quantity,
              inUse: item.inUse + req.quantity
            }
          : item
      )
    );

    setRequests((prev) =>
      prev.map((r) => (r.id === req.id ? { ...r, status: "Approved" } : r))
    );
  };

  const rejectRequest = (id) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "Rejected" } : r))
    );
  };

  const returnItem = (req) => {
    setInventory((prev) =>
      prev.map((item) =>
        item.name === req.item
          ? {
              ...item,
              available: item.available + req.quantity,
              inUse: item.inUse - req.quantity
            }
          : item
      )
    );

    setRequests((prev) =>
      prev.map((r) => (r.id === req.id ? { ...r, status: "Returned" } : r))
    );
  };

  /* ================= RESIDENT VIEW ================= */

  if (isResident) {
    return (
      <div style={page}>
        <h2>My Requests</h2>

        <button style={btn} onClick={() => setShowForm(true)}>
          + Create Request
        </button>

        <table style={table}>
          <tbody>
            {requests
              .filter((r) => r.requester === user?.name)
              .map((r) => (
                <tr key={r.id}>
                  <td>{r.item}</td>
                  <td>{r.quantity}</td>
                  <td>{r.status}</td>
                </tr>
              ))}
          </tbody>
        </table>

        {showForm && (
          <div style={overlay}>
            <div style={modal}>
              <h3>Create Request</h3>

              <input
                style={input}
                placeholder="Item"
                value={requestForm.item}
                onChange={(e) =>
                  setRequestForm({ ...requestForm, item: e.target.value })
                }
              />

              <input
                style={input}
                type="number"
                placeholder="Quantity"
                value={requestForm.quantity}
                onChange={(e) =>
                  setRequestForm({
                    ...requestForm,
                    quantity: Number(e.target.value)
                  })
                }
              />

              <input
                style={input}
                placeholder="Purpose"
                value={requestForm.purpose}
                onChange={(e) =>
                  setRequestForm({ ...requestForm, purpose: e.target.value })
                }
              />

              <button style={btn} onClick={createRequest}>
                Submit
              </button>

              <button style={cancelBtn} onClick={() => setShowForm(false)}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  /* ================= ADMIN VIEW ================= */

  return (
    <div style={page}>
      <h2>Inventory Management</h2>

      <button style={btn} onClick={() => setShowForm(true)}>
        + Add Inventory
      </button>

      <table style={table}>
        <tbody>
          {inventory.map((i) => (
            <tr key={i.id}>
              <td>{i.name}</td>
              <td>{i.total}</td>
              <td>{i.available}</td>
              <td>{i.inUse}</td>
              <td>
                <button style={iconBtn} onClick={() => openEdit(i)}>
                  <FaEdit />
                </button>
                <button
                  style={iconBtnDelete}
                  onClick={() => deleteItem(i.id)}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Requests</h3>

      <table style={table}>
        <tbody>
          {requests.map((r) => (
            <tr key={r.id}>
              <td>{r.requester}</td>
              <td>{r.item}</td>
              <td>{r.quantity}</td>
              <td>{r.status}</td>
              <td>
                {r.status === "Pending" && (
                  <>
                    <button style={iconBtn} onClick={() => approveRequest(r)}>
                      <FaCheck />
                    </button>
                    <button
                      style={iconBtnDelete}
                      onClick={() => rejectRequest(r.id)}
                    >
                      <FaTimes />
                    </button>
                  </>
                )}

                {r.status === "Approved" && (
                  <button style={iconBtn} onClick={() => returnItem(r)}>
                    <FaUndo />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showForm && (
        <div style={overlay}>
          <div style={modal}>
            <h3>{editMode ? "Edit Item" : "Add Item"}</h3>

            <input
              style={input}
              placeholder="Name"
              value={itemForm.name}
              onChange={(e) =>
                setItemForm({ ...itemForm, name: e.target.value })
              }
            />

            <input
              style={input}
              type="number"
              placeholder="Total"
              value={itemForm.total}
              onChange={(e) =>
                setItemForm({ ...itemForm, total: Number(e.target.value) })
              }
            />

            <button style={btn} onClick={saveItem}>
              Save
            </button>

            <button style={cancelBtn} onClick={() => setShowForm(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;

/* ================= ORIGINAL STYLES (RESTORED) ================= */

const page = { padding: "20px", background: "#f5f6fa" };

const table = {
  width: "100%",
  background: "white",
  borderCollapse: "collapse",
  marginBottom: "15px"
};

const btn = {
  padding: "10px",
  background: "#2c3e50",
  color: "white",
  border: "none",
  borderRadius: "6px",
  marginBottom: "10px",
  cursor: "pointer"
};

const input = {
  width: "100%",
  padding: "8px",
  marginBottom: "10px"
};

const overlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

const modal = {
  background: "white",
  padding: "20px",
  width: "340px",
  borderRadius: "10px"
};

const cancelBtn = {
  background: "gray",
  color: "white",
  padding: "8px",
  border: "none"
};

const iconBtn = {
  background: "#3498db",
  color: "white",
  border: "none",
  marginRight: "5px",
  padding: "6px 8px",
  borderRadius: "5px"
};

const iconBtnDelete = {
  background: "#e74c3c",
  color: "white",
  border: "none",
  padding: "6px 8px",
  borderRadius: "5px"
};