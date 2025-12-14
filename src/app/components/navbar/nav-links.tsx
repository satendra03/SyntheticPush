// src/app/components/navbar/nav-links.tsx
"use client";

import { navbarLinks } from "@/app/data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export const NavLinksDesktop = () => {
  const pathname = usePathname();

  return (
    <>
      {navbarLinks.map((item) => {
        const isActive =
          item.href === "/"
            ? pathname === "/"
            : pathname.startsWith(item.href);

        return (
          <button
            key={item.title}
            className={cn(
              "px-2 py-1 font-medium flex items-center gap-1 focus:outline-none bg-transparent hover:bg-transparent transition-colors duration-200 cursor-pointer",
              isActive
                ? "text-green-500 dark:text-green-400"
                : "muted-link"
            )}
          >
            <Link href={item.href}>{item.title}</Link>
          </button>
        );
      })}
    </>
  );
};

export const NavLinksMobile = ({
  setMobileOpen,
}: {
  setMobileOpen: (open: boolean) => void;
}) => {
  const pathname = usePathname();

  return (
    <>
      {navbarLinks.map((item) => {
        const isActive =
          item.href === "/"
            ? pathname === "/"
            : pathname.startsWith(item.href);

        return (
          <button
            key={item.title}
            className={cn(
              "flex items-center justify-between py-2 px-2 text-left text-lg font-medium rounded-md transition focus:outline-none bg-transparent hover:bg-transparent cursor-pointer",
              isActive
                ? "text-green-500 dark:text-green-400"
                : "muted-link"
            )}
          >
            <Link href={item.href} onClick={() => setMobileOpen(false)}>
              {item.title}
            </Link>
          </button>
        );
      })}
    </>
  );
};

