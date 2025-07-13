// src/app/components/navbar/nav-links.tsx

import { Button } from "@/components/ui/button";

const menuItems = [
  { label: "SyntheticPush", hasDropdown: false },
  { label: "How It Works", hasDropdown: false },
  { label: "Documentation", hasDropdown: false },
  { label: "Pricing", hasDropdown: false },
];

export const NavLinksDesktop = () => {
  return (
    <>
      {menuItems.map((item) => (
        <Button
          key={item.label}
          className="big-link px-2 py-1 font-medium flex items-center gap-1 focus:outline-none bg-transparent hover:bg-transparent text-foreground"
        >
          {item.label}
        </Button>
      ))}
    </>
  );
};

export const NavLinksMobile = () => {
  return (
    <>
      {menuItems.map((item) => (
        <Button
          key={item.label}
          className="flex items-center justify-between w-full py-2 px-2 text-left text-lg font-medium rounded-md transition big-link focus:outline-none bg-transparent hover:bg-transparent text-foreground"
        >
          {item.label}
        </Button>
      ))}
    </>
  );
};
