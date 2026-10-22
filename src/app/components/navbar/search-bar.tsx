// src/app/components/navbar/search-bar.tsx
"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

export const SearchBar = ({
  placeholder,
  className,
}: {
  placeholder: string;
  className?: string;
}) => {
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    if (search.trim()) {
      const query = search.trim().replace(/^@/, "");
      setSearch("");
      window.open(`https://github.com/${query}`, "_blank");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={cn("w-full max-w-xs", className)}>
      <div className="relative flex items-center">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
          <Search className="w-3.5 h-3.5" />
        </span>
        <input
          className="w-full h-8.5 rounded-lg border border-border/80 bg-muted/40 dark:bg-[#111a2e]/60 py-1.5 pl-8 pr-12 text-xs placeholder:text-muted-foreground/70 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/40 transition-all font-mono"
          placeholder={placeholder}
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <div className="absolute right-2 pointer-events-none">
          <kbd className="inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground/70 bg-muted/80 dark:bg-white/5 border border-border/60 rounded">
            /
          </kbd>
        </div>
      </div>
    </div>
  );
};

