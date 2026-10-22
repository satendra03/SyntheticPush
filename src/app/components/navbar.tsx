// src/app/components/navbar.tsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { GitHubIcon } from "@/icons/index";
import { SearchBar, NavLinksDesktop, NavLinksMobile } from "@/app/components";
import { AuthButton } from "@/app/components/auth/auth-button";
import { Star, Menu, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
    <nav className="fixed top-0 left-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-border/80 transition-all">
      <div className="container">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileOpen(true)}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 cursor-pointer focus:outline-none"
              aria-label="Open main menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>

          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="relative flex items-center justify-center p-1.5 rounded-xl bg-muted/60 dark:bg-white/5 border border-border/80 group-hover:border-emerald-500/50 transition-all">
                <GitHubIcon className="w-5 h-5 text-foreground group-hover:text-emerald-400 transition-colors" />
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              </div>
              <span className="font-bold text-base tracking-tight font-mono text-foreground group-hover:text-emerald-400 transition-colors">
                Synthetic<span className="text-emerald-400">Push</span>
              </span>
            </Link>
            <Badge 
              variant="outline" 
              className="hidden sm:inline-flex text-[10px] px-2 py-0.5 font-mono text-muted-foreground border-border/80 bg-muted/30"
            >
              v2.0
            </Badge>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center flex-1 justify-center">
            <NavLinksDesktop />
          </div>

          {/* Search Bar & GitHub Star & Auth */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex">
              <SearchBar className="w-52 lg:w-64" placeholder="Search GitHub user..." />
            </div>

            <Link
              href="https://github.com/satendra03/SyntheticPush"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-border/80 bg-muted/30 hover:bg-muted hover:border-emerald-500/40 text-foreground transition-all duration-200"
            >
              <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
              <span>Star</span>
            </Link>

            {/* Auth Menu */}
            <AuthButton />
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex lg:hidden">
          <div className="relative bg-background dark:bg-[#0d1424] w-full max-w-xs h-full flex flex-col shadow-2xl border-r border-border p-6 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-2">
                <GitHubIcon className="w-5 h-5 text-emerald-400" />
                <span className="font-bold font-mono text-sm">SyntheticPush</span>
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 focus:outline-none"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <SearchBar placeholder="Search GitHub profile..." />
              <NavLinksMobile setMobileOpen={setMobileOpen} />
            </div>

            <div className="pt-4 border-t border-border mt-auto">
              <Link
                href="https://github.com/satendra03/SyntheticPush"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2 px-3 rounded-lg text-xs font-semibold border border-border bg-muted/40 text-foreground hover:border-emerald-500/40"
              >
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span>Star on GitHub</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

