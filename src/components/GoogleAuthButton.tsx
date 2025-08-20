"use client";

import { useRouter } from "next/navigation";
import { auth, googleProvider } from "@/lib/firebase";
import { signInWithPopup, signInWithRedirect } from "firebase/auth";
import { useState, useEffect } from "react";

interface GoogleAuthButtonProps {
  label?: string; // e.g., "Sign in with Google" or "Sign up with Google"
}

export default function GoogleAuthButton({
  label = "Sign in with Google",
}: GoogleAuthButtonProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size for mobile redirect
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleGoogleAuth = async () => {
    setError(null);
    setLoading(true);

    try {
      if (isMobile) {
        // Mobile: redirect flow
        await signInWithRedirect(auth, googleProvider);
      } else {
        // Desktop: popup flow
        await signInWithPopup(auth, googleProvider);
        router.push("/dashboard"); // desktop can redirect immediately
      }
    } catch (err: any) {
      console.error("Google sign-in error:", err);
      if (err.code === "auth/popup-closed-by-user") {
        setError("You closed the sign-in popup before finishing.");
      } else if (err.code === "auth/cancelled-popup-request") {
        setError("Another sign-in attempt is already in progress.");
      } else if (err.code === "auth/network-request-failed") {
        setError("Check your internet connection and try again.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      {error && (
        <p className="mb-3 text-sm text-center text-red-500">{error}</p>
      )}

      <button
        onClick={handleGoogleAuth}
        disabled={loading}
        className={`flex items-center justify-center w-full max-w-xs gap-2 px-4 py-3 font-semibold text-white rounded-lg shadow-md cursor-pointer sm:max-w-sm
          ${
            loading
              ? "opacity-60 cursor-not-allowed"
              : "bg-emerald-500 hover:bg-emerald-600 focus:ring-2 focus:ring-emerald-500"
          }`}
      >
        {loading ? "Signing in…" : label}
      </button>
    </div>
  );
}
