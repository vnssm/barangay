import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // LOAD USER ON APP START
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (err) {
      console.log("Invalid user data");
      localStorage.removeItem("user");
    }
    setLoading(false);
  }, []);

  // ✅ FIXED LOGIN (NO EMAIL/PASSWORD VALIDATION)
  const login = (userData) => {
    if (!userData) return;

    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));

    return userData;
  };

  // LOGOUT
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);