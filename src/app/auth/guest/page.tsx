"use client";

import { useState } from "react";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function GuestPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  const guestEmail = process.env.NEXT_PUBLIC_GUEST_EMAIL || "guest@example.com";
  const guestPassword =
    process.env.NEXT_PUBLIC_GUEST_PASSWORD || "guestpassword";

  const handleGuestLogin = async () => {
    setError("");
    try {
      await signInWithEmailAndPassword(auth, guestEmail, guestPassword);
      router.push("/dashboard");
    } catch (err: any) {
      setError("Failed to sign in as guest");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12 bg-gray-50 dark:bg-gray-900">
      <img src="/logo.png" alt="Booth Buddy" className="w-24 mb-8 sm:w-28" />
      <h1 className="mb-6 text-2xl font-bold text-center text-gray-900 dark:text-gray-100 sm:text-3xl">
        Try Booth Buddy as a Guest
      </h1>

      {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

      <button
        onClick={handleGuestLogin}
        className="max-w-xs px-6 py-3 font-semibold text-white transition rounded-lg shadow-md cursor-pointer bg-emerald-500 hover:bg-emerald-600 focus:ring-2 focus:ring-emerald-500 sm:max-w-sm"
      >
        Enter as Guest
      </button>
    </div>
  );
}
