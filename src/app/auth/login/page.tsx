"use client";

import { useState } from "react";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import GoogleAuthButton from "@/components/GoogleAuthButton";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (err: any) {
      if (err.code === "auth/user-not-found") setError("User not found");
      else if (err.code === "auth/wrong-password")
        setError("Incorrect password");
      else setError("Failed to sign in");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12 bg-gray-50 dark:bg-gray-900">
      {/* Logo */}
      <img src="/logo.png" alt="Booth Buddy" className="w-24 mb-8 sm:w-28" />

      <h1 className="mb-8 text-2xl font-bold text-center text-gray-900 dark:text-gray-100 sm:text-3xl">
        Sign In
      </h1>

      {/* Email Login Form */}
      <form
        onSubmit={handleEmailLogin}
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
          Sign In
        </button>
      </form>

      {/* Forgot Password */}
      <div className="w-full max-w-xs mt-6 text-center sm:max-w-sm">
        <a
          href="/auth/forgot"
          className="text-sm font-medium transition-colors cursor-pointer text-amber-400 hover:text-amber-500"
        >
          Forgot password?
        </a>
      </div>

      {/* Separator */}
      <div className="flex items-center w-full max-w-xs my-8 sm:max-w-sm">
        <hr className="flex-grow border-gray-300 dark:border-gray-700" />
        <span className="px-3 text-sm text-gray-500 dark:text-gray-400">
          or
        </span>
        <hr className="flex-grow border-gray-300 dark:border-gray-700" />
      </div>

      {/* Google Login */}
      <GoogleAuthButton label="Sign in with Google" />

      {/* Sign Up Link */}
      <div className="mt-10 text-sm text-center text-gray-600 dark:text-gray-300">
        Don’t have an account?{" "}
        <a
          href="/auth/signup"
          className="font-semibold transition-colors cursor-pointer text-amber-400 hover:text-amber-500"
        >
          Sign up
        </a>
      </div>
    </div>
  );
}
