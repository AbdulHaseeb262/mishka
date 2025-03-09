"use client";

import React, { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { DeliveryAnimation } from "./DeliveryAnimation";

export function CheckoutButton({ onClick, isLoading }) {
  const [showDelivery, setShowDelivery] = useState(false);

  const handleClick = () => {
    onClick();
    setShowDelivery(true);
    setTimeout(() => setShowDelivery(false), 3000);
  };

  return (
    <>
      <button
        onClick={handleClick}
        disabled={isLoading}
        className="w-full flex items-center justify-center space-x-2 bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-600 transition-colors disabled:opacity-50"
      >
        {isLoading ? (
          <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
        ) : (
          <>
            <ShoppingCart className="h-5 w-5" />
            <span>Jetzt bestellen</span>
          </>
        )}
      </button>

      <DeliveryAnimation isVisible={showDelivery} />
    </>
  );
}
