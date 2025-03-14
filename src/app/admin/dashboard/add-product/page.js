"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Static products data (you can move this to a separate file and import it)
const productsData = [
  // Gemüse
  { category: "gemüse", subcategory: "frischgemüse" },
  { category: "gemüse", subcategory: "wurzelgemüse" },
  // Weine
  { category: "weine", subcategory: "weißwein" },
  { category: "weine", subcategory: "rotwein" },
  // Obst
  { category: "obst", subcategory: "kernobst" },
  { category: "obst", subcategory: "steinobst" },
  { category: "obst", subcategory: "beeren" },
  { category: "obst", subcategory: "tropischefrüchte" },
];

// Extract unique categories and subcategories
const categories = Array.from(new Set(productsData.map((p) => p.category)));
const subcategoriesMap = productsData.reduce((acc, product) => {
  if (!acc[product.category]) {
    acc[product.category] = new Set();
  }
  acc[product.category].add(product.subcategory);
  return acc;
}, {});

export default function AddProduct() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    imageUrl: "",
    name: "",
    description: "",
    category: "",
    subcategory: "",
    price: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "category" && { subcategory: "" }), // Reset subcategory when category changes
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const token = localStorage.getItem("adminToken");

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price) || 0,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to add product");
      router.push("/admin/dashboard/products");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-6">Add New Product</h1>
      {error && <p className="mb-4 text-red-400">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Image URL Field */}
        <div>
          <label className="block mb-1 font-medium">Image URL</label>
          <input
            type="text"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter image URL"
            required
          />
        </div>

        {/* Name Field */}
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Product name"
            required
          />
        </div>

        {/* Description Field */}
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Product description"
            required
          ></textarea>
        </div>

        {/* Category & Subcategory Dropdowns */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium">Subcategory</label>
            <select
              name="subcategory"
              value={formData.subcategory}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              required
              disabled={!formData.category}
            >
              <option value="">Select Subcategory</option>
              {formData.category &&
                Array.from(subcategoriesMap[formData.category]).map((sub) => (
                  <option key={sub} value={sub}>
                    {sub.charAt(0).toUpperCase() + sub.slice(1)}
                  </option>
                ))}
            </select>
          </div>
        </div>

        {/* Price Field */}
        <div>
          <label className="block mb-1 font-medium">Price (€)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter price"
            step="0.01"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 transition-all p-3 rounded font-bold w-full"
          >
            {loading ? "Adding Product..." : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
}
