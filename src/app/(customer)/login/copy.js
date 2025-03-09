"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

export default function AuthPage() {
  const router = useRouter();
  const { setIsLoggedIn } = useAuth();
  const [mode, setMode] = useState("login"); // or "signup"
  const [name, setName] = useState(""); // Only used in signup mode
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleAuth = async (e) => {
    e.preventDefault();
    setError("");

    // Determine the endpoint based on mode
    const endpoint =
      mode === "login" ? "/api/auth/login" : "/api/auth/register";

    const payload =
      mode === "login" ? { email, password } : { name, email, password };

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();

    if (res.ok) {
      if (mode === "signup") {
        // After signup, redirect to login mode
        setMode("login");
        setError("Signup successful! Please log in.");
        setName("");
        setEmail("");
        setPassword("");
      } else {
        // For login, store the token, update context and redirect
        localStorage.setItem("customerToken", data.token);
        setIsLoggedIn(true);
        router.push("/");
      }
    } else {
      setError(data.error || "An error occurred");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <form
        onSubmit={handleAuth}
        className="bg-gray-800 p-8 rounded shadow-md w-full max-w-md"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">
          {mode === "login" ? "Login" : "Sign Up"}
        </h1>
        {error && <p className="mb-4 text-center text-red-400">{error}</p>}
        {mode === "signup" && (
          <div className="mb-4">
            <label className="block mb-2">Name</label>
            <input
              type="text"
              className="w-full p-2 rounded bg-gray-700 text-white"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        )}
        <div className="mb-4">
          <label className="block mb-2">Email</label>
          <input
            type="email"
            className="w-full p-2 rounded bg-gray-700 text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2">Password</label>
          <input
            type="password"
            className="w-full p-2 rounded bg-gray-700 text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 p-2 rounded font-bold"
        >
          {mode === "login" ? "Login" : "Sign Up"}
        </button>
        <p className="mt-4 text-center text-sm">
          {mode === "login"
            ? "Don't have an account? "
            : "Already have an account? "}
          <button
            type="button"
            className="text-emerald-400 hover:underline"
            onClick={() => setMode(mode === "login" ? "signup" : "login")}
          >
            {mode === "login" ? "Sign Up" : "Login"}
          </button>
        </p>
      </form>
    </div>
  );
}
