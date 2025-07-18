// src/app/components/navbar.tsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { GitHubIcon } from "@/icons/index";
import { SearchBar, NavLinksDesktop, NavLinksMobile } from "@/app/components";
import { AuthButton } from "@/app/components/auth/auth-button";

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [mobileOpen]);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-background border-b border-border">
      <div className="container">
        <div className="flex h-16 items-center justify-between">
          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileOpen(true)}
              className="inline-flex items-center justify-center p-2 rounded-md cursor-pointer focus:outline-none"
              aria-label="Open main menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          {/* Logo */}
          <div className="hidden lg:flex items-center">
            <Link href="/">
              <span className="sr-only">SyntheticPush</span>
              <GitHubIcon />
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden lg:flex lg:items-center lg:space-x-4 flex-1 ml-4">
            <NavLinksDesktop />
          </div>

          {/* Search bar */}
          <div className="hidden lg:flex justify-center">
            <SearchBar className="w-full" placeholder="Search GitHub account" />
          </div>

          {/* Auth buttons */}
          <div className="flex items-center space-x-2 ml-4">
            <AuthButton />
          </div>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-opacity-60 flex lg:hidden">
          <div className="relative bg-background dark:bg-secondary w-full h-full flex flex-col shadow-xl">
            <div className="flex h-16 items-center justify-between px-4 border-b border-border">
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-secondary focus:outline-none"
                aria-label="Close menu"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <GitHubIcon />
            </div>
            <div className="flex-1 flex flex-col gap-2 px-4 py-6">
              <NavLinksMobile setMobileOpen={setMobileOpen} />
              <div className="px-4 p-4 flex flex-col w-full">
                <SearchBar
                  className="w-full mb-4"
                  placeholder="Search GitHub account"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
