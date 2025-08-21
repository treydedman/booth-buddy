"use client";

import { useState } from "react";
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import GoogleAuthButton from "@/components/GoogleAuthButton";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (err: any) {
      if (err.code === "auth/email-already-in-use")
        setError("Email already in use");
      else setError("Failed to create account");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12 bg-gray-50 dark:bg-gray-900">
      {/* Logo */}
      <img src="/logo.png" alt="Booth Buddy" className="w-24 mb-8 sm:w-28" />

      {/* Heading + Subheading */}
      <div className="px-2 mb-8 text-center sm:px-0">
        <h1 className="text-2xl font-bold leading-snug text-gray-900 dark:text-gray-100 sm:text-3xl md:text-4xl">
          Create Account
        </h1>
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-300 sm:text-base">
          Sign up today and start managing <br /> your inventory in minutes.
        </p>
      </div>

      {/* Email Signup Form */}
      <form
        onSubmit={handleSignup}
        className="flex flex-col w-full max-w-xs gap-4 sm:max-w-sm"
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-2 placeholder-gray-400 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-4 py-2 placeholder-gray-400 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500"
          required
        />
        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          className="px-4 py-2 font-semibold text-white transition bg-blue-500 rounded-lg shadow-md cursor-pointer hover:bg-blue-600 focus:ring-2 focus:ring-blue-500"
        >
          Sign Up
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

      {/* Google Signup */}
      <GoogleAuthButton label="Sign up with Google" />

      {/* Login Link */}
      <div className="mt-10 text-sm text-center text-gray-600 dark:text-gray-300">
        Already have an account?{" "}
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
