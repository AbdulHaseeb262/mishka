// 


"use client";
import { useContext } from "react";
import { ShopContext } from "../app/context/shopContext";
import { ShoppingCart } from "lucide-react";
import { useTranslation } from "react-i18next";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductGrid = ({ products }) => {
  const { addToCart } = useContext(ShopContext);
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product) => {
        const productId = product._id ? String(product._id) : "";
        return (
          <div
            key={productId}
            className="product-card bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 hover:scale-105"
          >
            <div className="relative">
              {product.imageUrl && (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 text-black">
                {product.name}
              </h3>
              <p className="text-gray-700 mb-4">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-emerald-400">
                  €{product.price}
                </span>
                <button
                  onClick={() => {
                    console.log("Adding item:", productId);
                    addToCart(productId);
                    toast.success("Artikel wurde dem Warenkorb hinzugefügt", {
                      position: "top-right",
                      autoClose: 3000,
                      });
                  }}
                  className="flex items-center space-x-2 bg-emerald-500 text-white px-4 py-2 rounded-full hover:bg-emerald-600 transition-all duration-300"
                >
                  <ShoppingCart className="h-5 w-5" />
                  {/* <span>{t("add_to_cart")}</span> */}
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductGrid;