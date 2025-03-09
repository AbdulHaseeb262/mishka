// filepath: /c:/Users/HP/Desktop/Task/mishex-next.js (2)/mishex-next.js/src/app/admin/dashboard/products/page.js
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "@fortawesome/fontawesome-free/css/all.min.css"; // Import Font Awesome CSS

export default function ProductListing() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (productId) => {
    const token = localStorage.getItem("adminToken");
    try {
      const res = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      if (!res.ok) throw new Error("Failed to delete product");
      setProducts((prev) => prev.filter((p) => p._id !== productId));
    } catch (err) {
      alert(err.message);
    }
  };

  const handleBestsellerToggle = async (productId, isBestseller) => {
    const token = localStorage.getItem("adminToken");
    try {
      const res = await fetch(`/api/products/${productId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({ bestseller: !isBestseller }),
      });
      if (!res.ok) throw new Error("Failed to update product");
      setProducts((prev) =>
        prev.map((p) =>
          p._id === productId ? { ...p, bestseller: !isBestseller } : p
        )
      );
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 gradient-text">Product Listing</h1>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {products.map((product) => (
            <li
              key={product._id}
              className="glass-card p-4 rounded-md shadow-md flex flex-col"
            >
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-gray-700">{product.description}</p>
              <p className="font-bold mt-2">€{product.price.toFixed(2)}</p>
              {product.imageUrl && (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="mt-2 h-40 object-cover rounded"
                />
              )}
              <div className="mt-8 flex justify-between items-center ">
                <button
                  onClick={() =>
                    handleBestsellerToggle(product._id, product.bestseller)
                  }
                  className={`heart-button ${
                    product.bestseller ? "filled" : ""
                  }`}
                >
                  <i
                    className={`fa${product.bestseller ? "s" : "r"} fa-heart`}
                  ></i>
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Delete Product
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
