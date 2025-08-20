"use client";

import { useState } from "react";
import { auth } from "@/lib/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent! Check your inbox.");
    } catch (err: any) {
      if (err.code === "auth/user-not-found") setError("User not found");
      else setError("Failed to send reset email");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12 bg-gray-50 dark:bg-gray-900">
      {/* Logo */}
      <img src="/logo.png" alt="Booth Buddy" className="w-24 mb-8 sm:w-28" />

      <h1 className="mb-8 text-2xl font-bold text-center text-gray-900 dark:text-gray-100 sm:text-3xl">
        Forgot Password
      </h1>

      {/* Email Form */}
      <form
        onSubmit={handleReset}
        className="flex flex-col w-full max-w-xs gap-4 sm:max-w-sm"
      >
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-2 placeholder-gray-400 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500"
          required
        />

        {message && <p className="text-sm text-emerald-500">{message}</p>}
        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          className="px-4 py-2 font-semibold text-white transition bg-blue-500 rounded-lg shadow-md cursor-pointer hover:bg-blue-600 focus:ring-2 focus:ring-blue-500"
        >
          Send Reset Link
        </button>
      </form>

      {/* Separator */}
      <div className="flex items-center w-full max-w-xs my-8 sm:max-w-sm">
        <hr className="flex-grow border-gray-300 dark:border-gray-700" />
        <span className="px-3 text-sm text-gray-500 dark:text-gray-400">
          or
        </span>
        <hr className="flex-grow border-gray-300 dark:border-gray-700" />
      </div>

      {/* Return to Login */}
      <div className="mt-4 text-sm text-center text-gray-600 dark:text-gray-300">
        Remembered your password?{" "}
        <a
          href="/auth/login"
          className="font-semibold transition-colors cursor-pointer text-amber-400 hover:text-amber-500"
        >
          Sign in
        </a>
      </div>
    </div>
  );
}
