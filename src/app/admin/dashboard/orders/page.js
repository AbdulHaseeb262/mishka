"use client";

import { useEffect, useState } from "react";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    const token = localStorage.getItem("adminToken");
    try {
      const res = await fetch("/api/orders", {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      if (!res.ok) throw new Error("Failed to fetch orders");
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId, newStatus) => {
    const token = localStorage.getItem("adminToken");
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error("Failed to update order status");
      fetchOrders();
    } catch (err) {
      console.error(err);
      alert("Error updating order status");
    }
  };

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 gradient-text">Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="glass-card p-6 rounded-xl">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    {/* Order #{order._id.slice(0, 8)} */}
                    Order #{order._id}
                  </h3>
                  <p className="text-gray-400">
                    {new Date(order.createdAt).toLocaleString("de-AT", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <p className="mt-2">
                    <strong>Subtotal:</strong> €{Number(order.total).toFixed(2)}
                  </p>
                  <p className="mt-2">
                    <strong>Payment Method:</strong> {order.paymentMethod}
                  </p>
                  <p className="mt-2">
                    <strong>Payment Status:</strong> {order.paymentStatus}
                  </p>
                </div>
                <select
                  value={order.status}
                  onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                  className="bg-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00ff88]"
                >
                  {[
                    "new",
                    "processing",
                    "shipped",
                    "delivered",
                    "cancelled",
                  ].map((status) => (
                    <option key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Customer Info</h4>
                  <p>{order.customerName}</p>
                  <p>{order.customerEmail}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Delivery Info</h4>
                  <p>{order.address}</p>
                  <p>
                    {new Date(order.deliveryDate).toLocaleDateString("de-AT")}
                  </p>
                  <p>{order.deliveryTime} Uhr</p>
                </div>
              </div>
              <div className="mt-6">
                <h4 className="font-semibold mb-2">Ordered Products</h4>
                {order.items.map((item) => (
                  <div
                    key={item.productId}
                    className="flex justify-between items-center text-gray-300 mb-2"
                  >
                    <div className="flex items-center">
                      {console.log(
                        "immmmmmmmmmaaaaaaaaaggggggeeee " + item.imageUrl
                      )}
                      <img
                        src={item.Url}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg mr-4"
                      />
                      <span>
                        {item.quantity}x {item.name}
                      </span>
                    </div>
                    <span>€{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="border-t border-gray-700 mt-4 pt-4 flex justify-between font-semibold">
                  <span>Total</span>
                  <span className="gradient-text">
                    €{Number(order.total).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
