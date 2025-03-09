"use client";
import { createContext, useContext, useState, useEffect } from "react";
import React from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("customerToken");
    const email = localStorage.getItem("customerEmail");
    setIsLoggedIn(!!token);
    setUserEmail(email || "");
  }, []);

  const logOut = () => {
    localStorage.removeItem("customerToken");
    localStorage.removeItem("customerEmail");
    setIsLoggedIn(false);
    setUserEmail("");
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, userEmail, setUserEmail, logOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
