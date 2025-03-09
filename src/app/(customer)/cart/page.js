"use client";
import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../context/shopContext";
import { useRouter } from "next/navigation";
import CartTotal from "../../../components/cart/CartTotal";

const Cart = () => {
  const { products, cartItems, updateQuantity, getCartAmount, currency } =
    useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // Convert cartItems (object) to an array: [{ id, quantity }]
    const tempData = Object.keys(cartItems).map((id) => ({
      id,
      quantity: cartItems[id],
    }));
    setCartData(tempData);
  }, [cartItems]);

  const subtotal = getCartAmount();

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">YOUR CART</div>
      <div>
        {cartData.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cartData.map((item) => {
            const productData = products.find(
              (product) => String(product._id) === String(item.id)
            );
            if (!productData) return null;
            return (
              <div
                key={item.id}
                className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
              >
                <div className="flex items-center gap-6">
                  <img
                    src={productData.imageUrl}
                    alt={productData.name}
                    className="w-16 sm:w-20"
                  />
                  <div>
                    <p className="text-xs sm:text-lg font-medium">
                      {productData.name}
                    </p>
                    <div className="flex items-center gap-5 mt-2">
                      <p>
                        {currency} {productData.price}
                      </p>
                    </div>
                  </div>
                </div>
                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) =>
                    e.target.value === "" || e.target.value === "0"
                      ? null
                      : updateQuantity(item.id, Number(e.target.value))
                  }
                  className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                />
                <img
                  onClick={() => updateQuantity(item.id, 0)}
                  src="/assets/bin_icon.png"
                  alt="Remove"
                  className="w-4 sm:w-5 mr-4 cursor-pointer"
                />
              </div>
            );
          })
        )}
      </div>
      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button
              onClick={() => router.push("/checkout")}
              className="bg-black text-white text-sm my-8 px-8 py-3 rounded-full"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
