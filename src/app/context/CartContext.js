/* "use client";
import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children, products }) {
  // Cart items structure: { productId: quantity }
  const [cartItems, setCartItems] = useState({});

  // Add an item: if already in cart, increment; otherwise, set quantity to 1.
  const addToCart = async (itemId) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }
    setCartItems(cartData);
  };

  // Update the quantity for a specific product.
  const updateQuantity = async (itemId, quantity) => {
    let cartData = structuredClone(cartItems);
    if (quantity <= 0) {
      delete cartData[itemId];
    } else {
      cartData[itemId] = quantity;
    }
    setCartItems(cartData);
  };

  // Get total number of items in the cart.
  const getCartCount = () => {
    return Object.values(cartItems).reduce((sum, qty) => sum + qty, 0);
  };

  // Calculate total cart amount using the products array.
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const id in cartItems) {
      const product = products.find((p) => String(p._id) === String(id));
      // If product is found and has a valid price, multiply price * quantity.
      if (product && product.price) {
        totalAmount += Number(product.price) * cartItems[id];
      }
    }
    return totalAmount;
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        getCartCount,
        getCartAmount,
        setCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
 */
