"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

export default function AuthPage() {
  const router = useRouter();
  const { setIsLoggedIn, setUserEmail } = useAuth();
  const [mode, setMode] = useState("login"); // "login", "signup", or "reset"
  const [name, setName] = useState(""); // Only used in signup mode
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(true); // State for password validation

  // Function to validate password
  const validatePassword = (password) => {
    const minLength = 8;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return password.length >= minLength && hasSpecialChar;
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    // Validate password in signup mode
    if (mode === "signup" && !validatePassword(password)) {
      setIsPasswordValid(false);
      return;
    }

    let endpoint;
    let payload;

    if (mode === "login") {
      endpoint = "/api/auth/login";
      payload = { email, password };
    } else if (mode === "signup") {
      endpoint = "/api/auth/register";
      payload = { name, email, password };
    } else if (mode === "reset") {
      endpoint = "/api/auth/reset-password";
      payload = { email };
    }

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();

    if (res.ok) {
      if (mode === "signup") {
        setMode("login");
        setMessage("Signup successful! Please log in.");
        setName("");
        setEmail("");
        setPassword("");
      } else if (mode === "login") {
        localStorage.setItem("customerToken", data.token);
        localStorage.setItem("customerEmail", email);
        setIsLoggedIn(true);
        setUserEmail(email);
        router.push("/shop");
      } else if (mode === "reset") {
        setMessage("Password reset link sent to your email.");
        setEmail("");
      }
    } else {
      setError(data.error || "An error occurred");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F1E4D5] text-black relative">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-50"
        style={{ backgroundImage: "url('/Muster.png')" }}
      ></div>
      <form
        onSubmit={handleAuth}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md relative z-10"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">
          {mode === "login"
            ? "Login"
            : mode === "signup"
            ? "Sign Up"
            : "Reset Password"}
        </h1>
        {error && <p className="mb-4 text-center text-red-600">{error}</p>}
        {message && (
          <p className="mb-4 text-center text-green-600">{message}</p>
        )}
        {mode === "signup" && (
          <div className="mb-4">
            <label className="block mb-2">Name</label>
            <input
              type="text"
              className="w-full p-2 rounded-3xl pl-4 bg-[#F1E4D5] text-black"
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
            className="w-full p-2 rounded-3xl pl-4 bg-[#F1E4D5] text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        {mode !== "reset" && (
          <div className="mb-4">
            <label className="block mb-2">Password</label>
            <input
              type="password"
              className="w-full p-2 rounded-3xl pl-4 bg-[#F1E4D5] text-black"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setIsPasswordValid(validatePassword(e.target.value)); // Validate password on change
              }}
              required
            />
            {mode === "signup" && !isPasswordValid && (
              <p className="text-red-600 text-sm mt-1">
                Password must be at least 8 characters long and contain a special
                character.
              </p>
            )}
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-black text-white p-2 rounded-full font-bold hover:bg-gray-900 disabled:opacity-50"
          disabled={mode === "signup" && !isPasswordValid} // Disable button if password is invalid
        >
          {mode === "login"
            ? "Login"
            : mode === "signup"
            ? "Sign Up"
            : "Send Reset Link"}
        </button>
        <p className="mt-4 text-center text-sm">
          {mode === "login" ? (
            <>
              Don't have an account?{" "}
              <button
                type="button"
                className="text-black hover:underline mb-2"
                onClick={() => setMode("signup")}
              >
                Sign Up
              </button>
              <br />
              Forgot Password?{" "}
              <button
                type="button"
                className="text-black hover:underline"
                onClick={() => setMode("reset")}
              >
                Reset Password
              </button>
            </>
          ) : (
            <button
              type="button"
              className="text-black hover:underline"
              onClick={() => setMode("login")}
            >
              {mode === "signup"
                ? "Already have an account? Login"
                : "Back to Login"}
            </button>
          )}
        </p>
      </form>
    </div>
  );
}