// src/app/components/navbar/search-bar.tsx
"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

export const SearchBar = ({
  placeholder,
  className,
}: {
  placeholder: string;
  className?: string;
}) => {
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    // TODO: Implement search logic
    alert("Searched for: " + search);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={cn("w-full", className)}>
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          <svg
            className="h-4 w-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
        </span>
        <Input
          className="w-full border border-gray-300  dark:border-[#30363D] py-2 pl-9 pr-3 text-sm placeholder-muted-foreground focus:outline-none focus:ring-0"
          placeholder={placeholder}
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
};
