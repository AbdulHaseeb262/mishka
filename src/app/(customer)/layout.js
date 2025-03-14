"use client";

import React from "react";

/* import ThemeToggle from "@/components/ThemeToggle"; */
import Footer from "@/components/Footer";

import "../globals.css";
import "../slider.css";
import ShopProvider from "../context/shopContext";
import Header from "@/components/Header";
import { AuthProvider } from "../context/AuthContext";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);



/* import { CartProvider } from "../context/CartContext"; */

/* function AuthInfo() {
  const { isLoggedIn } = useAuth();
  return (
    <div className="p-2 text-sm text-gray-400">
      {isLoggedIn ? "Logged in" : "Not logged in"}
    </div>
  );
} */

export default function RootLayout({ children }) {
  /* const [isCartModalOpen, setIsCartModalOpen] = useState(false); */

  return (
    <html lang="de">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="min-h-screen bg-gray-900 text-white">
      <ToastContainer />
        <AuthProvider>
          <Elements stripe={stripePromise}>
            <ShopProvider>
              {/*    <CartProvider> */}
              {/* Header */}
              <Header />
              {/* Optionally show auth status */}
              {/*     <AuthInfo /> */}
              {/* Main content */}
              <main>{children}</main>
              <Footer />
              {/*   <ThemeToggle /> */}

              {/* Cart Modal */}
              {/* {isCartModalOpen && (
              <CartModal
                isOpen={isCartModalOpen}
                onClose={() => setIsCartModalOpen(false)}
              />
            )} */}
              {/*   </CartProvider> */}
            </ShopProvider>
          </Elements>
        </AuthProvider>
      </body>
    </html>
  );
}
