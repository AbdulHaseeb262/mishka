"use client";
import React from "react";
import { Truck } from "lucide-react";

export function DeliveryAnimation({ isVisible }) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-gray-900 p-8 rounded-2xl text-center">
        <div className="relative mb-4">
          <div className="w-32 h-32 rounded-full bg-emerald-500/20 flex items-center justify-center">
            <Truck className="w-16 h-16 text-emerald-400 animate-bounce" />
          </div>
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-2 bg-emerald-500/20 rounded-full filter blur-sm animate-pulse" />
        </div>
        <h2 className="text-xl font-bold mb-2">
          Ihre Bestellung ist unterwegs!
        </h2>
        <p className="text-gray-400">
          Wir liefern Ihre frischen Produkte direkt zu Ihnen nach Hause.
        </p>
      </div>
    </div>
  );
}
