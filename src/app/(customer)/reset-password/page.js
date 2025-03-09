"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Local state for token and email
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");

  // Local state for new password fields and messages
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Extract token and email from URL on component mount
  useEffect(() => {
    const tokenFromUrl = searchParams.get("token") || "";
    const emailFromUrl = searchParams.get("email") || "";
    setToken(tokenFromUrl);
    setEmail(emailFromUrl);
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const res = await fetch("/api/auth/update-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, token, newPassword }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(
          "Password has been reset successfully. Redirecting to login..."
        );
        setTimeout(() => router.push("/login"), 3000);
      } else {
        setError(data.error || "Failed to reset password.");
      }
    } catch (err) {
      setError("An error occurred while resetting your password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F1E4D5]">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-8 text-center text-black">
          Reset Password
        </h1>
        {error && <p className="mb-4 text-center text-red-600">{error}</p>}
        {message && (
          <p className="mb-4 text-center text-green-600">{message}</p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 font-medium text-black">
              New Password
            </label>
            <input
              type="password"
              className="w-full p-2 rounded-3xl pl-4 bg-[#F1E4D5] text-black"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 font-medium text-black">
              Confirm New Password
            </label>
            <input
              type="password"
              className="w-full p-2 rounded-3xl pl-4 bg-[#F1E4D5] text-black"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white p-2 rounded-full font-bold hover:bg-gray-900"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}
