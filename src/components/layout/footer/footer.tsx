// src/app/components/footer.tsx
"use client";

import { footerLinks } from "@/app/data";
import { GitHubIcon } from "@/icons";
import Link from "next/link";

export const Footer = () => {
  return (
    <>
    <div className="w-full h-1 border-t border-border"></div>
    <footer className="container my-10">
      <div className="flex flex-col lg:flex-row w-full gap-10">
        <div className="flex flex-col w-full gap-2 lg:w-1/3">
          <h1 className="title flex items-center gap-2 text-2xl">
            <GitHubIcon className="w-6 h-6" />
            SyntheticPush
          </h1>
          <p className="text-sm">Create you own commits on GitHub</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-16 w-full">
          {footerLinks.map((link) => (
            <div key={link.title} className="flex flex-col">
              <h2 className="font-mono">{link.title}</h2>
              <div className="flex flex-col w-fit mt-2 gap-1.5">
                {link.links.map((link) => (
                  <Link href={link.href} key={link.title}>
                    <p className="body muted-link">{link.title}</p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </footer>
    </>
  );
};
