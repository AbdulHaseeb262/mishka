// src/app/context/ShopContext.js
"use client";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  // Cart items stored as an object: { [productId]: quantity }
  const [cartItems, setCartItems] = useState({});

  // Fetch products from backend and sanitize price
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        console.log("Products fetch response:", response);
        if (!response.ok) {
          toast.error("Failed to fetch products! Server returned an error.");
          return;
        }
        let data = await response.json();
        // Convert price to a number (replace comma if needed)
        data = data.map((product) => ({
          ...product,
          price: product.price
            ? parseFloat(product.price.toString().replace(",", "."))
            : 0,
        }));
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("An error occurred while fetching products!");
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!token && storedToken) {
      setToken(storedToken);
    }
  }, [token]);

  // Cart functions (no size)
  const addToCart = (itemId) => {
    const id = String(itemId);
    setCartItems((prev) => ({
      ...prev,
      [id]: prev[id] ? prev[id] + 1 : 1,
    }));
  };

  const updateQuantity = (itemId, quantity) => {
    const id = String(itemId);
    setCartItems((prev) => {
      const newCart = { ...prev };
      if (quantity <= 0) {
        delete newCart[id];
      } else {
        newCart[id] = quantity;
      }
      return newCart;
    });
  };

  const getCartCount = () => {
    return Object.values(cartItems).reduce((sum, qty) => sum + qty, 0);
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const id in cartItems) {
      const product = products.find(
        (p) => String(p._id) === String(id) || String(p.id) === String(id)
      );
      if (product && product.price) {
        totalAmount += Number(product.price) * cartItems[id];
      }
    }
    return totalAmount;
  };

  // Add clearCart function
  const clearCart = () => {
    setCartItems({});
  };

  // Constants for shipping and currency
  const delivery_fee = 5;
  const currency = "€";

  const value = {
    products,
    token,
    setToken,
    // Cart state and functions:
    cartItems,
    setCartItems,
    addToCart,
    updateQuantity,
    getCartCount,
    getCartAmount,
    clearCart,
    delivery_fee,
    currency,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopProvider;
