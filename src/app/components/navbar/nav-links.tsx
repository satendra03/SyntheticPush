// src/app/components/navbar/nav-links.tsx
"use client";

import { navbarLinks } from "@/app/data";
import Link from "next/link";

export const NavLinksDesktop = () => {
  return (
    <>
      {navbarLinks.map((item) => (
        <button key={item.title} className="muted-link px-2 py-1 font-medium flex items-center gap-1 focus:outline-none bg-transparent hover:bg-transparent text-foreground">
          <Link href={item.href} >
            {item.title}
          </Link>
        </button>
      ))}
    </>
  );
};

export const NavLinksMobile = ({ setMobileOpen }: { setMobileOpen: (open: boolean) => void }) => {
  return (
    <>
      {navbarLinks.map((item) => (
        <button key={item.title} className="flex items-center justify-between py-2 px-2 text-left text-lg font-medium rounded-md transition focus:outline-none bg-transparent hover:bg-transparent text-foreground">
          <Link href={item.href} onClick={() => setMobileOpen(false)}>
            {item.title}
          </Link>
        </button>
      ))}
    </>
  );
};
