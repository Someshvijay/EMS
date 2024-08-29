import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("isAuthenticated") === "true"; // Check localStorage
  });

  const [role, setRole] = useState(() => {
    return localStorage.getItem("role") || ""; // Fetch role from localStorage
  });

  const login = () => {
    setIsAuthenticated(true);
    setRole(localStorage.getItem("role"));
    localStorage.setItem("isAuthenticated", "true"); // Persist login state
  };

  const logout = () => {
    setIsAuthenticated(false);
    setRole(""); 
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("role"); // Remove login state
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
