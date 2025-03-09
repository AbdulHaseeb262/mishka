"use client";
import CategorySection from "../../../components/CategorySelection";
import { Wine } from "lucide-react";

const WeinePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Hero Section */}
      <div className="relative h-[400px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&q=80&w=1600')",
          }}
        />
        <div className="absolute inset-0 bg-black/50 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl">
              <div className="flex items-center space-x-4 mb-6">
                <Wine className="h-12 w-12 text-[#00a3ff]" />
                <h1 className="text-5xl font-bold text-white">Weine & Co.</h1>
              </div>
              <p className="text-xl text-gray-300">
                Entdecken Sie unsere erlesene Auswahl an österreichischen
                Weinen. Von fruchtigen Weißweinen bis zu vollmundigen Rotweinen
                - für jeden Geschmack das Richtige.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="py-16">
        <CategorySection category="weine" title="Weine & Co." />
      </div>
    </div>
  );
};
export default WeinePage;
