"use client";

import { useContext } from "react";
import { ShopContext } from "../../app/context/shopContext";
import { X } from "lucide-react";
import CartTotal from "./CartTotal";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

const Cart = ({ isCartOpen, setIsCartOpen }) => {
  const { cartItems, products, updateQuantity, currency } =
    useContext(ShopContext);
  const router = useRouter();
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  const cartData = Object.keys(cartItems).map((id) => ({
    id,
    quantity: cartItems[id],
  }));

  return (
    <div
      className={`fixed inset-0 z-50 flex transition-transform duration-300 ${
        isCartOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div
        className="w-full md:w-1/3 bg-[#F1E4D5] p-6 shadow-lg fixed right-0 top-0 h-full flex flex-col"
        style={{
          backgroundImage: "url('/Muster.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <button
          onClick={() => setIsCartOpen(false)}
          className="absolute top-4 right-4 text-black hover:text-black"
        >
          <X className="h-8 w-8" />
        </button>
        {/* <h2 className="text-2xl font-semibold mb-6">Your Cart</h2> */}
        {cartData.length === 0 ? (
          <p className="text-black text-center mt-12">Your cart is empty.</p>
        ) : (
          <div className="flex-1 overflow-y-auto pt-10 custom-scrollbar">
            {cartData.map((item) => {
              const productData = products.find(
                (product) => String(product._id) === String(item.id)
              );
              if (!productData) return null;
              return (
                <div
                  key={item.id}
                  className="p-4 my-2 mr-8 border-b bg-white rounded-xl text-black flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={productData.imageUrl}
                      alt={productData.name}
                      className="w-16 sm:w-20 sm:h-20 rounded"
                    />
                    <div>
                      <p className="text-sm sm:text-lg font-medium">
                        {productData.name}
                      </p>
                      <p className="text-black text-sm">
                        {currency} {productData.price}
                      </p>
                      <div className="flex items-center gap-2 border px-2 py-1 rounded-full mt-2">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              Math.max(1, item.quantity - 1)
                            )
                          }
                          className="px-2 text-lg text-black hover:text-black"
                        >
                          -
                        </button>
                        <span className="px-3 text-sm font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="px-2 text-lg text-black hover:text-black"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => updateQuantity(item.id, 0)}
                    className="text-black hover:text-red-600 transition-all ease-in-out duration-200"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
        {/* <CartTotal /> */}
        <button
          onClick={() => {
            const totalPrice = cartData.reduce((total, item) => {
              const productData = products.find(
                (product) => String(product._id) === String(item.id)
              );
              return (
                total + (productData ? productData.price * item.quantity : 0)
              );
            }, 0);

            if (totalPrice < 50) {
              alert("Minimum 50 euros to checkout");
              return;
            }
            if (!isLoggedIn) {
              alert("login to checkout");
              router.push("/login");
              return;
            }

            setIsCartOpen(false);
            router.push("/checkout");
          }}
          className="bg-black text-white text-center text-lg my-4 px-8 py-3 rounded-full w-full hover:bg-gray-900"
        >
          ZUR KASSE
        </button>
      </div>
      <div
        className="w-2/3 bg-black md:opacity-50"
        onClick={() => setIsCartOpen(false)}
      />
    </div>
  );
};

export default Cart;
