import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import ProtectedRoute from "../components/ProtectedRoute";

import Signup from "../pages/Signup";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Residents from "../pages/Residents";
import Certificates from "../pages/Certificates";
import Complaints from "../pages/Complaints";
import Events from "../pages/Events";
import Calendar from "../pages/Calendar";
import Inventory from "../pages/Inventory";
import Posts from "../pages/Posts";
import Settings from "../pages/Settings";

const AppRoutes = () => {
  return (
    <Routes>

      {/* PUBLIC */}
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/signup" element={<Signup />} />

      {/* APP LAYOUT */}
      <Route element={<Layout />}>

        {/* DASHBOARD (ALL ROLES) */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin", "resident", "guest"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* RESIDENTS (VIEW CONTROL INSIDE COMPONENT) */}
        <Route
          path="/residents"
          element={
            <ProtectedRoute allowedRoles={["admin", "resident"]}>
              <Residents />
            </ProtectedRoute>
          }
        />

        {/* CERTIFICATES (MAIN SYSTEM) */}
        <Route
          path="/certificates"
          element={
            <ProtectedRoute allowedRoles={["admin", "resident"]}>
              <Certificates />
            </ProtectedRoute>
          }
        />

        {/* COMPLAINTS */}
        <Route
          path="/complaints"
          element={
            <ProtectedRoute allowedRoles={["admin", "resident"]}>
              <Complaints />
            </ProtectedRoute>
          }
        />

        {/* EVENTS */}
        <Route
          path="/events"
          element={
            <ProtectedRoute allowedRoles={["admin", "resident", "guest"]}>
              <Events />
            </ProtectedRoute>
          }
        />

        {/* CALENDAR */}
        <Route
          path="/calendar"
          element={
            <ProtectedRoute allowedRoles={["admin", "resident", "guest"]}>
              <Calendar />
            </ProtectedRoute>
          }
        />

        {/* INVENTORY */}
        <Route
          path="/inventory"
          element={
            <ProtectedRoute allowedRoles={["admin", "resident"]}>
              <Inventory />
            </ProtectedRoute>
          }
        />

        {/* POSTS */}
        <Route
          path="/posts"
          element={
            <ProtectedRoute allowedRoles={["admin", "resident", "guest"]}>
              <Posts />
            </ProtectedRoute>
          }
        />
        {/* POSTS */}
        <Route
          path="/settings"
          element={
            <ProtectedRoute allowedRoles={["admin", "resident"]}>
              <Settings />
            </ProtectedRoute>
          }
        />

      </Route>
    </Routes>
  );
};

export default AppRoutes;