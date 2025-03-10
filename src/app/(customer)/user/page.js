"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useAuth } from "@/app/context/AuthContext";

export default function UserProfilePage() {
  const router = useRouter();
  const { isLoggedIn, userEmail, logOut } = useAuth();
  const [userData, setUserData] = useState({
    name: "",
    email: userEmail,
    role: "",
    profilePic: "", // if not set, default will be used
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Order tracking state (simulate order presence)
  const [hasOrder, setHasOrder] = useState(false); // Replace with actual order-check logic later
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState(null);
  const [orderError, setOrderError] = useState("");

  // Fetch user data from the API
  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }
    async function fetchUserData() {
      try {
        const res = await fetch(`/api/user/${userEmail}`);
        const data = await res.json();
        if (res.ok) {
          setUserData(data);
          // For demonstration, we assume the user has placed an order.
          // Replace with actual order-check logic.
          setHasOrder(true);
        } else {
          setError(data.error || "Failed to fetch user data");
        }
      } catch (err) {
        setError("An error occurred while fetching user data");
      }
    }
    fetchUserData();
  }, [isLoggedIn, router, userEmail]);

  // Logout handler
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      logOut();
      router.push("/login");
    }
  };

  // Reset password handler
  const handleResetPassword = async () => {
    setMessage("");
    setError("");
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

  // Order tracking handler (inline, on profile page)
  const handleTrackOrder = async () => {
    setOrderError("");
    setOrder(null);
    if (!orderId.trim()) {
      setOrderError("Bitte geben Sie eine Bestellnummer ein.");
      return;
    }
    try {
      const response = await fetch(
        `/api/orders/tracker?orderId=${encodeURIComponent(
          orderId
        )}&email=${encodeURIComponent(userData.email)}`
      );
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Order not found");
      }
      const data = await response.json();
      setOrder(data);
    } catch (err) {
      setOrderError(
        err instanceof Error ? err.message : "Ein Fehler ist aufgetreten"
      );
    }
  };

  if (!userData || !isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-700">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F1E4D5] text-black relative p-8">
      {/* Background image overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-50"
        style={{ backgroundImage: "url('/Muster.png')" }}
      ></div>

      {/* Content Overlay */}
      <div className="relative z-10">
        {/* Header */}
        <header className="bg-white shadow-md">
          <div className="container mx-auto flex justify-between items-center px-6 py-4">
            <h1 className="text-2xl font-bold text-gray-800">
              Alex am Naschmarkt
            </h1>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Profile Card */}
            <div className="bg-white shadow-lg rounded-lg p-8">
              <div className="flex flex-col items-center mb-6">
                <div className="relative w-32 h-32 mb-4">
                  <Image
                    src={userData.profilePic || "/default-avatar.jpeg"}
                    alt="Profile Picture"
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <div className="text-center">
                  <p className="text-xl font-semibold text-gray-800">
                    {userData.name}
                  </p>
                  <p className="text-md text-gray-600">{userData.email}</p>
                  <p className="text-md text-gray-600">Role: {userData.role}</p>
                </div>
              </div>
              <button
                onClick={handleResetPassword}
                className="w-full bg-black text-white py-2 rounded-full font-bold hover:bg-gray-900 transition"
              >
                Reset Password
              </button>
              {error && (
                <div className="mt-4 p-4 bg-red-500/20 text-red-600 rounded-lg text-center">
                  {error}
                </div>
              )}
              {message && (
                <div className="mt-4 p-4 bg-green-500/20 text-green-600 rounded-lg text-center">
                  {message}
                </div>
              )}
            </div>

            {/* Order Tracking Card */}
            {hasOrder && (
              <div className="bg-white shadow-lg rounded-lg p-8">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">
                  Track Your Order
                </h2>
                <p className="mb-4 text-sm text-gray-600">
                  If you have placed an order, enter your Order ID below to
                  check its status.
                </p>
                <div className="flex space-x-4 mb-4">
                  <input
                    type="text"
                    placeholder="Enter Order ID"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    className="flex-1 border border-gray-300 p-2 rounded text-gray-800"
                  />
                  <button
                    onClick={handleTrackOrder}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                  >
                    Track
                  </button>
                </div>
                {orderError && (
                  <p className="mt-2 text-red-500">{orderError}</p>
                )}
                {order && (
                  <div className="mt-6 p-4 border border-gray-300 rounded">
                    <h3 className="text-xl font-bold mb-2 text-gray-800">
                      Order Details
                    </h3>
                    <p className="text-gray-700">
                      <strong>Order Number:</strong> {order._id}
                    </p>
                    <p className="text-gray-700">
                      <strong>Status:</strong> {order.status}
                    </p>
                    <p className="text-gray-700">
                      <strong>Delivery Date:</strong>{" "}
                      {new Date(order.deliveryDate).toLocaleDateString("de-AT")}
                    </p>
                    <p className="text-gray-700">
                      <strong>Delivery Time:</strong> {order.deliveryTime} Uhr
                    </p>
                    <p className="text-gray-700">
                      <strong>Customer:</strong> {order.customerName}
                    </p>
                    {/* Render additional order details as needed */}
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
