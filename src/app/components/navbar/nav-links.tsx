// src/app/components/navbar/nav-links.tsx
"use client";

import { navbarLinks } from "@/app/data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export const NavLinksDesktop = () => {
  const pathname = usePathname();

  return (
    <div className="flex items-center space-x-1">
      {navbarLinks.map((item) => {
        const isActive =
          item.href === "/"
            ? pathname === "/"
            : pathname.startsWith(item.href);

        return (
          <Link
            key={item.title}
            href={item.href}
            className={cn(
              "px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 cursor-pointer relative",
              isActive
                ? "text-emerald-400 font-semibold bg-emerald-500/10 border border-emerald-500/20"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            )}
          >
            {item.title}
          </Link>
        );
      })}
    </div>
  );
};

export const NavLinksMobile = ({
  setMobileOpen,
}: {
  setMobileOpen: (open: boolean) => void;
}) => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col space-y-1">
      {navbarLinks.map((item) => {
        const isActive =
          item.href === "/"
            ? pathname === "/"
            : pathname.startsWith(item.href);

        return (
          <Link
            key={item.title}
            href={item.href}
            onClick={() => setMobileOpen(false)}
            className={cn(
              "flex items-center justify-between py-2.5 px-3 text-base font-medium rounded-lg transition-colors cursor-pointer",
              isActive
                ? "text-emerald-400 bg-emerald-500/10 font-semibold border border-emerald-500/20"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            )}
          >
            <span>{item.title}</span>
            {isActive && (
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            )}
          </Link>
        );
      })}
    </div>
  );
};


