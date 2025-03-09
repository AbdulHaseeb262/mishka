"use client";

import React, { useState } from "react";

export default function OrderTrackerPage() {
  const [orderId, setOrderId] = useState("");
  const [email, setEmail] = useState("");
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");

  const handleTrackOrder = async () => {
    setError("");
    setOrder(null);
    if (!orderId) {
      setError("Bitte geben Sie eine Bestellnummer ein.");
      return;
    }
    try {
      // Call the tracker endpoint, passing orderId and optionally email as query parameters
      const response = await fetch(
        `/api/orders/tracker?orderId=${encodeURIComponent(
          orderId
        )}&email=${encodeURIComponent(email)}`
      );
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Order not found");
      }
      const data = await response.json();
      setOrder(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Ein Fehler ist aufgetreten"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-12">
      <h1 className="text-3xl font-bold mb-6">Bestellstatus verfolgen</h1>
      <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-md">
        {error && <p className="mb-4 text-red-400">{error}</p>}
        <div className="mb-4">
          <label className="block mb-2 text-sm">Bestellnummer</label>
          <input
            type="text"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="Geben Sie Ihre Bestellnummer ein"
            className="w-full px-4 py-2 rounded bg-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm">E-Mail (optional)</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ihre E-Mail (zur Verifizierung)"
            className="w-full px-4 py-2 rounded bg-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <button
          onClick={handleTrackOrder}
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded"
        >
          Bestellung verfolgen
        </button>
      </div>
      {order && (
        <div className="mt-8 w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Bestellstatus</h2>
          <p>
            <strong>Bestellnummer:</strong> {order._id}
          </p>
          <p>
            <strong>Status:</strong> {order.status}
          </p>
          <p>
            <strong>Lieferdatum:</strong>{" "}
            {new Date(order.deliveryDate).toLocaleDateString("de-AT")}
          </p>
          <p>
            <strong>Lieferzeit:</strong> {order.deliveryTime} Uhr
          </p>
          <p>
            <strong>Kunde:</strong> {order.customerName}
          </p>
          {/* Add additional order details as needed */}
        </div>
      )}
    </div>
  );
}
