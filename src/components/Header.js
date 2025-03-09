import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingCart, Menu, X, User } from "lucide-react";
import { useState, useContext, useEffect } from "react";
import { ShopContext } from "../app/context/shopContext";
import { useAuth } from "@/app/context/AuthContext";
import Cart from "./cart/Cart";

export default function Header() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  // State flag to determine if an order has been placed
  const [hasOrdered, setHasOrdered] = useState(false);

  const { getCartCount } = useContext(ShopContext);
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  const cartCount = getCartCount();

  const navItems = [
    { name: "HOME", href: "/" },
    { name: "ÜBER UNS", href: "/about" },
    { name: "MENÜ", href: "/menu" },
    { name: "JETZT KONTAKTIEREN!", href: "/contact" },
    { name: "SHOP", href: "/shop" },
  ];

  const logout = () => {
    localStorage.removeItem("customerToken");
    localStorage.removeItem("customerEmail");
    // Optionally clear the order flag on logout if desired:
    // localStorage.removeItem("hasOrdered");
    setIsLoggedIn(false);
    router.push("/login");
  };

  // On mount, check for the "hasOrdered" flag from localStorage
  useEffect(() => {
    const orderFlag = localStorage.getItem("hasOrdered");
    setHasOrdered(orderFlag === "true");
  }, []);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const closeDropdown = (e) => {
      if (!e.target.closest(".profile-dropdown")) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("click", closeDropdown);
    return () => document.removeEventListener("click", closeDropdown);
  }, []);

  return (
    <header className="bg-[#2a2a2a] text-white">
      {/* Desktop Header */}
      <div className="hidden md:flex items-center justify-between px-4 py-3">
        {/* Logo on extreme left */}
        <div className="logo">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Alex am Naschmarkt"
              width={120}
              height={60}
              priority
              className="cursor-pointer"
            />
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex items-center space-x-8">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <span
                className={`hover:text-gray-400 transition ${
                  router.pathname === item.href ? "text-gray-400" : ""
                }`}
              >
                {item.name}
              </span>
            </Link>
          ))}
        </nav>

        {/* Right-side: Profile and Cart */}
        <div className="flex items-center space-x-4">
          {/* Profile Icon / Login */}
          <div className="relative profile-dropdown">
            {isLoggedIn ? (
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <User className="w-6 h-6 hover:text-gray-400 transition" />
              </button>
            ) : (
              <Link href="/login">
                <span
                  className={`hover:text-gray-400 transition ${
                    router.pathname === "/login" ? "text-gray-400" : ""
                  }`}
                >
                  LOGIN
                </span>
              </Link>
            )}

            {/* Desktop Profile Dropdown */}
            {isProfileOpen && isLoggedIn && (
              <div className="absolute right-0 mt-2 w-40 bg-gray-800 rounded-md shadow-lg z-50">
                <Link
                  href="/user"
                  className="block px-4 py-2 hover:bg-gray-700 rounded-t-md"
                  onClick={() => setIsProfileOpen(false)}
                >
                  Profile
                </Link>
                {hasOrdered && (
                  <Link
                    href="/track-order"
                    onClick={() => setIsProfileOpen(false)}
                    className="block px-4 py-2 hover:bg-gray-700"
                  >
                    Track Your Order
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-700 rounded-b-md"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Cart Icon */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <ShoppingCart className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 relative">
        {/* Hamburger on extreme left */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          <Menu className="h-6 w-6" />
        </button>

        {/* Centered Logo */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Alex am Naschmarkt"
              width={120}
              height={60}
              priority
              className="cursor-pointer pointer-events-auto"
            />
          </Link>
        </div>

        {/* Profile Icon on extreme right */}
        <div className="relative profile-dropdown">
          {isLoggedIn ? (
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <User className="w-6 h-6 hover:text-gray-400 transition" />
            </button>
          ) : (
            <Link href="/login">
              <span
                className={`hover:text-gray-400 transition ${
                  router.pathname === "/login" ? "text-gray-400" : ""
                }`}
              >
                LOGIN
              </span>
            </Link>
          )}

          {/* Mobile Profile Dropdown */}
          {isProfileOpen && isLoggedIn && (
            <div className="absolute right-0 mt-2 w-40 bg-gray-800 rounded-md shadow-lg z-50">
              <Link
                href="/user"
                className="block px-4 py-2 hover:bg-gray-700 rounded-t-md"
                onClick={() => setIsProfileOpen(false)}
              >
                Profile
              </Link>
              {hasOrdered && (
                <Link
                  href="/track-order"
                  onClick={() => setIsProfileOpen(false)}
                  className="block px-4 py-2 hover:bg-gray-700"
                >
                  Track Your Order
                </Link>
              )}
              <button
                onClick={logout}
                className="w-full text-left px-4 py-2 hover:bg-gray-700 rounded-b-md"
              >
                Logout
              </button>
              {/* "View My Cart" Option */}
              <button
                onClick={() => {
                  setIsProfileOpen(false);
                  setIsCartOpen(true);
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-700"
              >
                View My Cart
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-gray-800 bg-opacity-95 flex flex-col items-center justify-center">
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute top-4 right-4 text-white"
          >
            <X className="h-8 w-8" />
          </button>
          <nav className="flex flex-col items-center space-y-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl text-white hover:text-emerald-400 transition-colors"
              >
                {item.name}
              </Link>
            ))}
            {hasOrdered && (
              <Link
                href="/track-order"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl text-white hover:text-emerald-400 transition-colors"
              >
                TRACK YOUR ORDER
              </Link>
            )}
          </nav>
        </div>
      )}

      {/* Cart Sidebar */}
      <Cart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
    </header>
  );
}
