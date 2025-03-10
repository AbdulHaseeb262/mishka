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
    profilePic: "", // This will store the selected avatar path
  });
  // State to control whether the avatar selector is shown
  const [isEditingAvatar, setIsEditingAvatar] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [hasOrder, setHasOrder] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState(null);
  const [orderError, setOrderError] = useState("");

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
          setHasOrder(true);
          // If a profilePic already exists, hide the avatar selector.
          if (data.profilePic) {
            setIsEditingAvatar(false);
          }
        } else {
          setError(data.error || "Failed to fetch user data");
        }
      } catch (err) {
        setError("An error occurred while fetching user data");
      }
    }
    fetchUserData();
  }, [isLoggedIn, router, userEmail]);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      logOut();
      router.push("/login");
    }
  };

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
    <div className="min-h-screen bg-[#F1E4D5] text-black relative p-4 md:p-8">
      {/* Background image overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-50"
        style={{ backgroundImage: "url('/Muster.png')" }}
      ></div>

      {/* Content Overlay */}
      <div className="relative z-10">
        {/* Header */}
        <header className="bg-white shadow-md">
          <div className="container mx-auto flex justify-between items-center px-4 py-3 md:px-6 md:py-4">
            <h1 className="text-lg md:text-2xl font-bold text-gray-800 truncate">
              Alex am Naschmarkt
            </h1>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1.5 md:px-4 md:py-2 rounded hover:bg-red-600 transition text-sm md:text-base"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-2 md:px-6 py-6 md:py-12">
          <div className="grid grid-cols-1 gap-6 md:gap-8">
            {/* Profile Card */}
            <div className="bg-white shadow-lg rounded-lg p-4 md:p-8">
              <div className="flex flex-col items-center mb-4 md:mb-6">
                {/* Conditional rendering: Show avatar selector or the profile avatar with hover overlay */}
                {isEditingAvatar ? (
                  // Avatar Selection Section
                  <div className="mb-4">
                    <p className="text-center text-sm md:text-base font-medium text-gray-700 mb-2">
                      Select Your Avatar
                    </p>
                    <div className="flex justify-center gap-4">
                      {/* Boys Avatar - already available */}
                      <div
                        className={`cursor-pointer border-2 p-1 rounded-full ${
                          userData.profilePic === "/default-avatar.jpeg"
                            ? "border-blue-500"
                            : "border-transparent"
                        }`}
                        onClick={() => {
                          setUserData((prev) => ({
                            ...prev,
                            profilePic: "/default-avatar.jpeg",
                          }));
                          // Hide the selector after choosing
                          setIsEditingAvatar(false);
                        }}
                      >
                        <Image
                          src="/default-avatar.jpeg"
                          alt="Boy Avatar"
                          width={80}
                          height={80}
                          className="rounded-full"
                        />
                      </div>
                      {/* Girls Avatar - Replace "/image.png" with your girl's avatar image if needed */}
                      <div
                        className={`cursor-pointer border-2 p-1 rounded-full ${
                          userData.profilePic === "/image.png"
                            ? "border-blue-500"
                            : "border-transparent"
                        }`}
                        onClick={() => {
                          setUserData((prev) => ({
                            ...prev,
                            profilePic: "/image.png",
                          }));
                          // Hide the selector after choosing
                          setIsEditingAvatar(false);
                        }}
                      >
                        <Image
                          src="/image.png" // Put your girl's avatar image path here
                          alt="Girl Avatar"
                          width={80}
                          height={80}
                          className="rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  // Display the selected avatar with a hover overlay that says "Change"
                  <div
                    className="relative group cursor-pointer mb-4"
                    onClick={() => setIsEditingAvatar(true)}
                  >
                    <div className="relative w-24 h-24 md:w-32 md:h-32">
                      <Image
                        src={userData.profilePic || "/default-avatar.jpeg"}
                        alt="Profile Picture"
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition">
                      <span className="text-white text-sm md:text-base">
                        Change
                      </span>
                    </div>
                  </div>
                )}
                <div className="text-center">
                  <p className="text-lg md:text-xl font-semibold text-gray-800">
                    {userData.name}
                  </p>
                  <p className="text-sm md:text-md text-gray-600">
                    {userData.email}
                  </p>
                  <p className="text-sm md:text-md text-gray-600">
                    Role: {userData.role}
                  </p>
                </div>
              </div>

              <button
                onClick={handleResetPassword}
                className="w-full bg-black text-white py-2 rounded-full font-bold hover:bg-gray-900 transition text-sm md:text-base"
              >
                Reset Password
              </button>
              {error && (
                <div className="mt-3 md:mt-4 p-3 md:p-4 bg-red-500/20 text-red-600 rounded-lg text-center text-sm md:text-base">
                  {error}
                </div>
              )}
              {message && (
                <div className="mt-3 md:mt-4 p-3 md:p-4 bg-green-500/20 text-green-600 rounded-lg text-center text-sm md:text-base">
                  {message}
                </div>
              )}
            </div>

            {/* Order Tracking Card */}
            {hasOrder && (
              <div className="bg-white shadow-lg rounded-lg p-4 md:p-8">
                <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-gray-800">
                  Track Your Order
                </h2>
                <p className="mb-3 md:mb-4 text-xs md:text-sm text-gray-600">
                  If you have placed an order, enter your Order ID below to
                  check its status.
                </p>
                <div className="flex flex-col md:flex-row gap-3 md:space-x-4 mb-3 md:mb-4">
                  <input
                    type="text"
                    placeholder="Enter Order ID"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    className="w-full border border-gray-300 p-2 rounded text-gray-800 text-sm md:text-base"
                  />
                  <button
                    onClick={handleTrackOrder}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition text-sm md:text-base w-full md:w-auto"
                  >
                    Track
                  </button>
                </div>
                {orderError && (
                  <p className="mt-2 text-red-500 text-sm md:text-base">
                    {orderError}
                  </p>
                )}
                {order && (
                  <div className="mt-4 md:mt-6 p-3 md:p-4 border border-gray-300 rounded">
                    <h3 className="text-lg md:text-xl font-bold mb-2 text-gray-800">
                      Order Details
                    </h3>
                    <p className="text-gray-700 text-sm md:text-base">
                      <strong>Order Number:</strong> {order._id}
                    </p>
                    <p className="text-gray-700 text-sm md:text-base">
                      <strong>Status:</strong> {order.status}
                    </p>
                    <p className="text-gray-700 text-sm md:text-base">
                      <strong>Delivery Date:</strong>{" "}
                      {new Date(order.deliveryDate).toLocaleDateString("de-AT")}
                    </p>
                    <p className="text-gray-700 text-sm md:text-base">
                      <strong>Delivery Time:</strong> {order.deliveryTime} Uhr
                    </p>
                    <p className="text-gray-700 text-sm md:text-base">
                      <strong>Customer:</strong> {order.customerName}
                    </p>
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
