"use client";

import { useRouter } from "next/navigation";
import ThemeToggle from "../../../components/ThemeToggle";
import CategorySection from "../../../components/CategorySelection";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      {/* Hero Section */}
      <div className="relative h-[400px] md:h-[600px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transform hover:scale-105 transition-transform duration-700"
          style={{
            backgroundImage: "url('/Foto 10.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent">
          <div className="container mx-auto px-4 h-full flex items-center">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                <span className="text-emerald-400">Frisch</span> vom
                <br />
                <span className="text-3xl md:text-5xl">Naschmarkt</span>
              </h2>
              <p className="text-lg md:text-xl mb-8 text-gray-300">
                Entdecken Sie die Vielfalt unserer frischen Produkte
              </p>
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                <a
                  href="#gemüse"
                  className="bg-[#D3183D] text-white text-lg font-medium px-4 md:px-8 py-2 md:py-4 rounded-full hover:bg-red-600 transition-all duration-300"
                >
                  Gemüse entdecken
                </a>
                <a
                  href="#weine"
                  className="bg-white/10 backdrop-blur-sm text-white text-lg font-medium px-4 md:px-8 py-2 md:py-4 rounded-full hover:bg-white/20 transition-all duration-300"
                >
                  Weine entdecken
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Gemüse Section */}
      <CategorySection category="gemüse" title="Frisches Gemüse" />
      <CategorySection category="obst" title="Saftiges Obst" />
      {/* Weine Section */}
      <CategorySection category="weine" title="Weine & Co." />
      <ThemeToggle />
    </>
  );
}
