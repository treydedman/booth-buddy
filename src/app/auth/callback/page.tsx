"use client";

import { useEffect, useState } from "react";
import { auth, googleProvider } from "@/lib/firebase";
import { getRedirectResult, UserCredential } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function CallbackPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleRedirect = async () => {
      setError(null);
      try {
        const result: UserCredential | null = await getRedirectResult(auth);
        if (result && result.user) {
          console.log("Signed in user:", result.user);
          router.replace("/dashboard");
        } else {
          // Redirect result not available; maybe already signed in
          router.replace("/dashboard");
        }
      } catch (err: any) {
        console.error("Google sign-in redirect error:", err);
        if (err.code === "auth/popup-closed-by-user") {
          setError("You closed the sign-in popup before finishing.");
        } else if (err.code === "auth/cancelled-popup-request") {
          setError("Another sign-in attempt is already in progress.");
        } else if (err.code === "auth/network-request-failed") {
          setError("Network error. Please check your connection.");
        } else {
          setError("Something went wrong. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    handleRedirect();
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12 bg-gray-50 dark:bg-gray-900">
      {loading && (
        <p className="text-gray-700 dark:text-gray-200">Signing you in...</p>
      )}
      {error && <p className="text-center text-red-500">{error}</p>}
    </div>
  );
}
