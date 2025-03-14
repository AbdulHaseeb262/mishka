"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useAuth } from "@/app/context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UserProfilePage() {
  const router = useRouter();
  const { isLoggedIn, userEmail, logOut } = useAuth();
  const [userData, setUserData] = useState({
    name: "",
    email: userEmail,
    role: "",
    profilePic: "",
  });
  const [isEditingAvatar, setIsEditingAvatar] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [orders, setOrders] = useState([]);
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
        } else {
          setError(data.error || "Failed to fetch user data");
        }
      } catch (err) {
        setError("An error occurred while fetching user data");
      }
    }

    const fetchOrders = async () => {
      try {
        const res = await fetch(`/api/orders/tracker/?email=${userEmail}`);
        const data = await res.json();
        if (res.ok) {
          setOrders(data);
        } else {
          setOrderError(data.error || "Failed to fetch orders");
        }
      } catch (err) {
        setOrderError("An error occurred while fetching orders");
      }
    };

    fetchUserData();
    fetchOrders();
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

  const handleCancelOrder = async (orderId) => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      try {
        const response = await fetch(`/api/orders/tracker`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderId: orderId,
            email: userData.email,
          }),
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || "Failed to cancel order");
        }

        toast.success("Bestellung erfolgreich storniert", {
          position: "top-right",
          autoClose: 3000,
        });

        const res = await fetch(`/api/orders/tracker/?email=${userEmail}`);
        const updatedOrders = await res.json();
        if (res.ok) {
          setOrders(updatedOrders);
        }
      } catch (error) {
        toast.error(error.message, {
          position: "top-right",
          autoClose: 3000,
        });
      }
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
      <div
        className="absolute inset-0 bg-cover bg-center opacity-50"
        style={{ backgroundImage: "url('/Muster.png')" }}
      ></div>

      <div className="relative z-10">
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

        <main className="container mx-auto px-2 md:px-6 py-6 md:py-12">
          <div className="grid grid-cols-1 gap-6 md:gap-8">
            <div className="bg-white shadow-lg rounded-lg p-4 md:p-8">
              <div className="flex flex-col items-center mb-4 md:mb-6">
                {isEditingAvatar ? (
                  <div className="mb-4">
                    <p className="text-center text-sm md:text-base font-medium text-gray-700 mb-2">
                      Select Your Avatar
                    </p>
                    <div className="flex justify-center gap-4">
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
                          setIsEditingAvatar(false);
                        }}
                      >
                        <Image
                          src="/image.png"
                          alt="Girl Avatar"
                          width={80}
                          height={80}
                          className="rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
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

            <div className="bg-white shadow-lg rounded-lg p-4 md:p-8">
              <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-gray-800">
                Your Orders
              </h2>
              {orderError && (
                <p className="text-red-500 text-sm md:text-base mb-4">
                  {orderError}
                </p>
              )}
              {orders.length === 0 ? (
                <p className="text-gray-600">No orders found.</p>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order._id}
                      className="border border-gray-300 rounded-lg p-4"
                    >
                      <h3 className="text-lg font-bold mb-2">
                        Order #{order._id}
                      </h3>
                      <p className="text-gray-700">
                        <strong>Status:</strong> {order.status}
                      </p>
                      <p className="text-gray-700">
                        <strong>Total:</strong> €{order.total.toFixed(2)}
                      </p>
                      <p className="text-gray-700">
                        <strong>Date:</strong>{" "}
                        {new Date(order.createdAt).toLocaleDateString("de-AT")}
                      </p>
                      {/* Updated cancellation condition */}
                      {order.status !== "cancelled" &&
                        order.status !== "shipped" && (
                          <button
                            onClick={() => handleCancelOrder(order._id)}
                            className="mt-2 bg-red-500 text-white px-3 py-1.5 rounded hover:bg-red-600 transition"
                          >
                            Cancel Order
                          </button>
                        )}
                      {order.status === "shipped" && (
                        <p className="mt-2 text-sm text-gray-500">
                          Diese Bestellung kann nicht storniert werden, da sie
                          versandt wurde
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
