


"use client";

import React, { useState, useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CreditCard, Clock, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";
import { ShopContext } from "../../../app/context/shopContext";

const getAvailableDeliveryDates = () => {
  const dates = [];
  const today = new Date();
  for (let i = 1; i <= 14; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    // Skip Sundays (0 = Sunday)
    if (date.getDay() !== 0) {
      dates.push(date);
    }
  }
  return dates;
};

const getAvailableDeliveryTimes = () => {
  const times = [];
  for (let hour = 8; hour <= 17; hour++) {
    times.push(`${hour.toString().padStart(2, "0")}:00`);
  }
  return times;
};

export default function CheckoutPage() {
  const {
    products,
    cartItems,
    getCartAmount,
    delivery_fee,
    currency,
    updateQuantity,
    clearCart,
  } = useContext(ShopContext);
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    postalCode: "",
    deliveryTime: "",
  });
  const [deliveryDate, setDeliveryDate] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const subtotal = getCartAmount();
  const shippingCost = subtotal >= 100 ? 0 : 5;
  const totalWithShipping = Math.round((subtotal + shippingCost) * 100) / 100;
  const twentypercent = Math.round((totalWithShipping * 0.2) * 100) / 100;
  const totaltobepaid = Math.round((totalWithShipping + twentypercent)*100)/100;

  const availableDates = getAvailableDeliveryDates();
  const availableTimes = getAvailableDeliveryTimes();

  const isWeekday = (date) => date.getDay() !== 0;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };

  // const handleCheckout = async () => {
  //   if (!deliveryDate || !formData.deliveryTime) {
  //     setError("Bitte wählen Sie ein Lieferdatum und eine Lieferzeit aus.");
  //     return;
  //   }
  //   setIsProcessing(true);
  //   setError(null);

  //   try {
  //     const formattedDate = deliveryDate.toISOString();

  //     // Prepare items with imageUrl
  //     const items = Object.keys(cartItems).map((id) => {
  //       const product = products.find((product) => product._id === id);
  //       return {
  //         productId: product._id,
  //         name: product.name,
  //         quantity: cartItems[id],
  //         price: product.price,
  //         Url: product.imageUrl, // Include imageUrl
  //       };
  //     });

  //     console.log(items);

  //     // Create Order Record in Backend
  //     const orderResponse = await fetch("/api/orders", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         customerName: `${formData.firstName} ${formData.lastName}`,
  //         customerEmail: formData.email,
  //         address: `${formData.street}, ${formData.postalCode} ${formData.city}`,
  //         deliveryDate: formattedDate,
  //         deliveryTime: formData.deliveryTime,
  //         items: items,
  //         total: totalWithShipping,
  //       }),
  //     });

  //     if (!orderResponse.ok) {
  //       const errData = await orderResponse.json();
  //       throw new Error(errData.error || "Order creation failed");
  //     }

  //     clearCart();
  //     const orderData = await orderResponse.json();
  //           const orderId = orderData._id;
      
  //           router.push(`/order-confirmation/${orderId}`);
  //     // router.push("/order-confirmation");
  //   } catch (err) {
  //     setError(
  //       err instanceof Error ? err.message : "Ein Fehler ist aufgetreten"
  //     );
  //   } finally {
  //     setIsProcessing(false);
  //   }
  // };

  const handleCheckout = async () => {
    if (!deliveryDate || !formData.deliveryTime) {
      setError("Bitte wählen Sie ein Lieferdatum und eine Lieferzeit aus.");
      return;
    }
    setIsProcessing(true);
    setError(null);
  
    try {
      const formattedDate = deliveryDate.toISOString();
  
      // Prepare items with imageUrl
      const items = Object.keys(cartItems).map((id) => {
        const product = products.find((product) => product._id === id);
        return {
          productId: product._id,
          name: product.name,
          quantity: cartItems[id],
          price: product.price,
          Url: product.imageUrl, // Include imageUrl
        };
      });
  
      console.log(items);
  
      // Create Order Record in Backend (without payment status)
      const orderResponse = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: `${formData.firstName} ${formData.lastName}`,
          customerEmail: formData.email,
          address: `${formData.street}, ${formData.postalCode} ${formData.city}`,
          deliveryDate: formattedDate,
          deliveryTime: formData.deliveryTime,
          items: items,
          total: totalWithShipping,
          paymentMethod: "Stripe", // Indicate payment method
          paymentStatus: "pending", // Initial payment status
        }),
      });
  
      if (!orderResponse.ok) {
        const errData = await orderResponse.json();
        throw new Error(errData.error || "Order creation failed");
      }
  
      const orderData = await orderResponse.json();
      const orderId = orderData._id;
  
      // Prepare items for Stripe Checkout
      const stripeItems = items.map((item) => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      }));
  
      // Create Stripe Checkout Session
      const stripeResponse = await fetch("/api/stripe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: stripeItems,
          orderId: orderId, // Pass orderId to Stripe API
        }),
      });
  
      if (!stripeResponse.ok) {
        throw new Error("Failed to create Stripe checkout session");
      }
  
      const { url } = await stripeResponse.json();
  
      // Redirect to Stripe Checkout
      if (url) {
        window.location.href = url;
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Ein Fehler ist aufgetreten"
      );
    } finally {
      setIsProcessing(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-[#F1E4D5] text-black relative">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-50"
        style={{ backgroundImage: "url('/Muster.png')" }}
      ></div>
      <div className="container mx-auto px-4 py-40 relative z-10">
        {/* <h2 className="text-2xl font-bold mb-6">Checkout</h2> */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold mb-6">Bestellung aufgeben</h2>
              {error && (
                <div className="mb-6 p-4 bg-red-500/20 text-red-600 rounded-lg">
                  {error}
                </div>
              )}
              <div className="space-y-6">
                {/* Personal Information */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Vorname
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-3xl bg-[#F1E4D5] focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Nachname
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-3xl bg-[#F1E4D5] focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    E-Mail
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-3xl bg-[#F1E4D5] focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-3xl bg-[#F1E4D5] focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Straße & Hausnummer
                  </label>
                  <input
                    type="text"
                    name="street"
                    value={formData.street}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-3xl bg-[#F1E4D5] focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      PLZ
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-3xl bg-[#F1E4D5] focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Stadt
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-3xl bg-[#F1E4D5] focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      required
                    />
                  </div>
                </div>
                {/* Delivery Date and Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      <Calendar className="inline-block w-5 h-5 mr-2" />
                      Lieferdatum
                    </label>
                    <DatePicker
                      selected={deliveryDate}
                      onChange={(date) => setDeliveryDate(date)}
                      filterDate={isWeekday}
                      placeholderText="Bitte wählen"
                      className="min-w-full px-4 py-2 rounded-full bg-[#F1E4D5] text-black focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      dateFormat="P"
                      required
                    />
                  </div>
                  <div className="relative">
                    <label className="block text-sm font-medium mb-2">
                      <Clock className="inline-block w-5 h-5 mr-2" />
                      Lieferzeit
                    </label>
                    <select
                      name="deliveryTime"
                      value={formData.deliveryTime}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-full bg-[#F1E4D5] focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none cursor-pointer"
                      required
                    >
                      <option value="">Bitte wählen</option>
                      {availableTimes.map((time) => (
                        <option key={time} value={time}>
                          {time} Uhr
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={handleCheckout}
              disabled={isProcessing}
              className="w-[70%] mx-auto flex items-center justify-center space-x-2 mt-8 bg-black text-white px-6 py-3 rounded-full hover:bg-gray-900 transition-colors disabled:opacity-50"
            >
              {isProcessing ? (
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
              ) : (
                <>
                  <CreditCard className="h-5 w-5" />
                  <span>Jetzt bezahlen</span>
                </>
              )}
            </button>
          </div>
          {/* Order Overview Section */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold mb-6">Bestellübersicht</h2>
              <div className="flex flex-col gap-2 text-sm">
                {/* Cart Items */}
                {Object.keys(cartItems).map((id) => {
                  const product = products.find(
                    (product) => product._id === id
                  );
                  if (!product) return null;
                  return (
                    <div
                      key={id}
                      className="flex flex-col justify-between text-xl "
                    >
                      <p>{product.name}</p>
                      <p className="tracking-wider">
                        {cartItems[id]}x {currency}
                         {(product.price * cartItems[id]).toFixed(2)}
                      </p>
                    </div>
                  );
                })}

                <hr className="border border-gray-400" />
                <div className="flex justify-between text-xl">
                  <p>Zwischensumme</p>
                  <p>
                  {currency} {subtotal.toFixed(2)}
                  </p>
                </div>
                <div className="flex justify-between text-xl">
                  <p>Lieferung</p>
                  <p>
                    {currency} {shippingCost}
                  </p>
                </div>
                  <div className="flex justify-between text-xl">
                   <p>MwSt</p>
                   <p>
                     {currency} {twentypercent}
                   </p>
             </div>
                <div className="flex justify-between font-extrabold text-lg mt-2 text-green-500">
                  <p>Total</p>
                  <p>
                    {currency} {totaltobepaid}
                  </p>

                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
