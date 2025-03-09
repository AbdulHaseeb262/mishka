"use client";

import React from "react";
import CategorySection from "@/components/CategorySelection";
import { Carrot } from "lucide-react";

export default function GemuesePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Hero Section */}
      <div className="relative h-[400px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&q=80&w=1600')",
          }}
        />
        <div className="absolute inset-0 bg-black/50 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl">
              <div className="flex items-center space-x-4 mb-6">
                <Carrot className="h-12 w-12 text-[#00ff88]" />
                <h1 className="text-5xl font-bold text-white">Gemüse & Co.</h1>
              </div>
              <p className="text-xl text-gray-300">
                Entdecken Sie unsere große Auswahl an frischem, regionalem
                Gemüse. Von knackigem Salat bis zu würzigen Kräutern – bei uns
                finden Sie alles für Ihre Küche.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="py-16">
        <CategorySection category="gemüse" title="Frisches Gemüse" />
        <CategorySection category="obst" title="Saftiges Obst" />
      </div>
    </div>
  );
}
