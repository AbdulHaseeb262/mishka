"use client";

import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  const handleLogout = () => {
    // Remove admin token and redirect to login
    localStorage.removeItem("adminToken");
    router.push("/admin/login");
  };

  return (
    <header className="bg-gray-800 border-b border-gray-700 px-6 py-4 flex items-center justify-between">
      {/* Logo Section */}
      <div className="flex items-center gap-2">
        <img src="/logo.png" alt="Logo" className="h-8 w-8 object-contain" />
        <span className="text-xl font-bold text-green-400">Admin Panel</span>
      </div>
      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-all"
      >
        Logout
      </button>
    </header>
  );
}
