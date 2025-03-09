// 

"use client";
import React, { useState } from "react";
import ProductGrid from "./ProductGrid";
import { useProducts } from "../hooks/useProducts";
import { Filter, Carrot, Wine, Apple } from "lucide-react";

const CategorySection = ({ category, title }) => {
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const { getProductsByCategory, getUniqueSubcategories } = useProducts();
  const subcategories = getUniqueSubcategories(category);
  const products = getProductsByCategory(category, selectedSubcategory);

  const getCategoryIcon = () => {
    switch (category) {
      case "gemüse":
        return <Carrot className="h-8 w-8 text-orange-500" />;
      case "weine":
        return <Wine className="h-8 w-8 text-[#00a3ff]" />;
      case "obst":
        return <Apple className="h-8 w-8 text-[#29aa45]" />;
      default:
        return null;
    }
  };

  const subcategoryLabels = {
    frischgemüse: "Frischgemüse",
    wurzelgemüse: "Wurzelgemüse",
    weißwein: "Weißwein",
    rotwein: "Rotwein",
    kernobst: "Kernobst",
    steinobst: "Steinobst",
    tropischefrüchte: "Tropische Früchte",
    beeren: "Beeren",
  };

  return (
    <section id={category} className="py-10 md:py-20 bg-[#F4E5D5]">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 md:mb-16">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <div className="bg-white rounded-full shadow-3xl p-2">
              {getCategoryIcon()}
            </div>
            <h2 className="text-2xl md:text-4xl font-bold text-black">
              {title}
            </h2>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 bg-[#D3183D] text-white px-3 md:px-4 py-2 rounded-full hover:bg-red-600 transition-all duration-300"
          >
            <Filter className="h-5 w-5" />
            <span className="text-sm md:text-base">Filter</span>
          </button>
        </div>

        {/* Filter Buttons */}
        {showFilters && (
          <div className="mb-8 flex flex-wrap gap-2 md:gap-4">
            <button
              onClick={() => setSelectedSubcategory("")}
              className={`px-3 md:px-4 py-1 md:py-2 rounded-full transition-all duration-300 ${
                selectedSubcategory === ""
                  ? "bg-[#D3183D] text-white"
                  : "bg-white text-black hover:bg-[#D3183D] hover:text-white"
              }`}
            >
              Alle
            </button>
            {subcategories.map((subcat) => (
              <button
                key={subcat}
                onClick={() => setSelectedSubcategory(subcat)}
                className={`px-3 md:px-4 py-1 md:py-2 rounded-full transition-all duration-300 ${
                  selectedSubcategory === subcat
                    ? "bg-[#D3183D] text-white"
                    : "bg-white text-black hover:bg-[#D3183D] hover:text-white"
                }`}
              >
                {subcategoryLabels[subcat] || subcat}
              </button>
            ))}
          </div>
        )}

        {/* Product Grid */}
        <ProductGrid products={products} />
      </div>
    </section>
  );
};

export default CategorySection;