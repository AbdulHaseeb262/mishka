"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

export default function UserPage() {
  const router = useRouter();
  const { isLoggedIn, userEmail, logOut } = useAuth();
  const [userData, setUserData] = useState({
    name: "",
    email: userEmail,
    role: "",
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    } else {
      // Fetch user data from the backend
      const fetchUserData = async () => {
        try {
          const res = await fetch(`/api/user/${userEmail}`);
          const data = await res.json();
          if (res.ok) {
            setUserData(data);
          } else {
            setError(data.error || "Failed to fetch user data");
          }
        } catch (err) {
          setError("An error occurred while fetching user data");
        }
      };

      fetchUserData();
    }
  }, [isLoggedIn, router, userEmail]);

  const handleResetPassword = async () => {
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userData.email }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Password reset link sent to your email.");
      } else {
        setError(data.error || "Failed to send reset link");
      }
    } catch (err) {
      setError("An error occurred while sending reset link");
    }
  };

  const handleLogout = () => {
    if (window.confirm("Are you really sure you want to log out?")) {
      logOut();
      router.push("/");
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen bg-[#F1E4D5] text-black relative">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-50"
        style={{ backgroundImage: "url('/Muster.png')" }}
      ></div>
      <div className="container mx-auto px-4 py-40 relative z-10">
        <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-6">User Information</h2>
          {error && (
            <div className="mb-6 p-4 bg-red-500/20 text-red-600 rounded-lg">
              {error}
            </div>
          )}
          {message && (
            <div className="mb-6 p-4 bg-green-500/20 text-green-600 rounded-lg">
              {message}
            </div>
          )}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <p className="w-full px-4 py-2 rounded-3xl bg-[#F1E4D5]">
                {userData.name}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <p className="w-full px-4 py-2 rounded-3xl bg-[#F1E4D5]">
                {userData.email}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Role</label>
              <p className="w-full px-4 py-2 rounded-3xl bg-[#F1E4D5]">
                {userData.role}
              </p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={handleResetPassword}
                className="flex-1 bg-black text-white p-2 rounded-full font-bold hover:bg-gray-900"
              >
                Reset Password
              </button>
              {/* <button
                onClick={handleLogout}
                className="flex-1 bg-red-600 text-white p-2 rounded-full font-bold hover:bg-red-700"
              >
                Logout
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
