"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

// Dynamically load CategorySection with SSR disabled
const CategorySection = dynamic(
  () => import("../../../components/CategorySelection"),
  {
    ssr: false,
    loading: () => (
      <div className="h-96 bg-gray-100 animate-pulse rounded-xl" />
    ),
  }
);

export default function HomePage() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Server-side placeholder--haseeb
  if (!isMounted) {
    return (
      <div className="min-h-screen bg-[#F1E4D5]">
        {/* Hero Section Skeleton */}
        <div className="relative h-[400px] md:h-[600px] bg-gray-200 animate-pulse" />

        {/* Category Section Skeletons */}
        <div className="space-y-8 mt-8">
          <div className="h-96 bg-gray-100 animate-pulse rounded-xl" />
          <div className="h-96 bg-gray-100 animate-pulse rounded-xl" />
          <div className="h-96 bg-gray-100 animate-pulse rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F1E4D5]">
      {/* Hero Section */}
      <div className="relative h-[400px] md:h-[600px] overflow-hidden">
        <div className="absolute inset-0 transform hover:scale-105 transition-transform duration-700">
          <Image
            src="/Foto 10.jpg"
            alt="Fresh products from Naschmarkt"
            fill
            priority
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII="
            className="object-cover"
          />
        </div>
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
                <button
                  onClick={() =>
                    document
                      .getElementById("gemüse")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="bg-[#D3183D] text-white text-lg font-medium px-4 md:px-8 py-2 md:py-4 rounded-full hover:bg-red-600 transition-all duration-300"
                >
                  Gemüse entdecken
                </button>
                <button
                  onClick={() =>
                    document
                      .getElementById("weine")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="bg-white/10 backdrop-blur-sm text-white text-lg font-medium px-4 md:px-8 py-2 md:py-4 rounded-full hover:bg-white/20 transition-all duration-300"
                >
                  Weine entdecken
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Sections */}
      <CategorySection category="gemüse" title="Frisches Gemüse" id="gemüse" />
      <CategorySection category="obst" title="Saftiges Obst" />
      <CategorySection category="weine" title="Weine & Co." id="weine" />
    </div>
  );
}
