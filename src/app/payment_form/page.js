"use client";

import PaymentForm from "../../components/PaymentForm";

export default function CheckoutPage() {
  const totalAmount = 100; // Replace with your actual total amount

  return (
    <div className="min-h-screen bg-[#F1E4D5] text-black relative">
      <div className="container mx-auto px-4 py-40 relative z-10">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Checkout</h2>
          <div className="space-y-6">
            <p className="text-lg">
              Total Amount: ${totalAmount}
            </p>
            <PaymentForm totalAmount={totalAmount} />
          </div>
        </div>
      </div>
    </div>
  );
}