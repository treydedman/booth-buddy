"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Sun, Moon, Menu, X } from "lucide-react";
import Image from "next/image";

export default function PublicNavbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Theme is only accessed after component mounts to avoid hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-background shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Booth Buddy Logo"
              width={32}
              height={32}
              className="h-8 w-8"
            />
            <span className="ml-2 text-xl font-bold text-primary">
              Booth Buddy
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden sm:flex sm:items-center sm:space-x-4">
            <Link
              href="/login"
              className="text-foreground hover:text-primary px-3 py-2 text-sm font-medium"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="text-foreground hover:text-primary px-3 py-2 text-sm font-medium"
            >
              Sign Up
            </Link>
            <Link
              href="/guest"
              className="text-foreground hover:text-primary px-3 py-2 text-sm font-medium"
            >
              Try Demo
            </Link>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md text-foreground hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Toggle theme"
            >
              {mounted && theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="sm:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 text-foreground hover:text-primary"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="sm:hidden">
            <div className="flex flex-col space-y-2 px-2 pb-3 pt-2">
              <Link
                href="/login"
                className="text-foreground hover:text-primary block rounded-md px-3 py-2 text-base font-medium"
                onClick={toggleMenu}
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="text-foreground hover:text-primary block rounded-md px-3 py-2 text-base font-medium"
                onClick={toggleMenu}
              >
                Sign Up
              </Link>
              <Link
                href="/guest"
                className="text-foreground hover:text-primary block rounded-md px-3 py-2 text-base font-medium"
                onClick={toggleMenu}
              >
                Try Demo
              </Link>
              <button
                onClick={toggleTheme}
                className="flex items-center rounded-md px-3 py-2 text-base font-medium text-foreground hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label="Toggle theme"
              >
                {mounted && theme === "dark" ? (
                  <>
                    <Sun className="h-5 w-5 mr-2" /> Light Mode
                  </>
                ) : (
                  <>
                    <Moon className="h-5 w-5 mr-2" /> Dark Mode
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
