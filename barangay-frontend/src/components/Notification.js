import React, { useEffect } from "react";

const Notification = ({ message, type = "info", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div style={{ ...container, ...types[type] }}>
      {message}
    </div>
  );
};

const container = {
  position: "fixed",
  top: "20px",
  right: "20px",
  padding: "12px 15px",
  borderRadius: "8px",
  color: "white",
  fontSize: "14px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
  zIndex: 9999,
  minWidth: "200px"
};

const types = {
  success: { background: "#27ae60" },
  error: { background: "#e74c3c" },
  info: { background: "#3498db" },
  warning: { background: "#f39c12" }
};

export default Notification;