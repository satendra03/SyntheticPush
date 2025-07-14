// src/app/components/navbar/nav-links.tsx

import { Button } from "@/components/ui/button";
import { navbarLinks } from "@/app/data/navbar-links";
import Link from "next/link";

export const NavLinksDesktop = () => {
  return (
    <>
      {navbarLinks.map((item) => (
        <Link href={item.href} key={item.title}>
          <Button
            className="big-link px-2 py-1 font-medium flex items-center gap-1 focus:outline-none bg-transparent hover:bg-transparent text-foreground"
          >
            {item.title}
          </Button>
        </Link>
      ))}
    </>
  );
};

export const NavLinksMobile = () => {
  return (
    <>
      {navbarLinks.map((item) => (
        <Link href={item.href} key={item.title}>
          <Button
            className="flex items-center justify-between w-full py-2 px-2 text-left text-lg font-medium rounded-md transition big-link focus:outline-none bg-transparent hover:bg-transparent text-foreground"
          >
            {item.title}
          </Button>
        </Link>
      ))}
    </>
  );
};
