// src/app/components/footer.tsx
"use client";

import { footerLinks } from "@/app/data";
import { GitHubIcon } from "@/icons";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="border-t border-border/80 bg-muted/20 backdrop-blur-md pt-16 pb-12">
      <div className="container">
        <div className="flex flex-col lg:flex-row w-full justify-between gap-12">
          {/* Brand & Mission Column */}
          <div className="flex flex-col gap-4 max-w-sm">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-muted/80 dark:bg-white/5 border border-border/80 text-foreground">
                <GitHubIcon className="w-5 h-5 text-emerald-400" />
              </div>
              <span className="font-bold text-lg font-mono tracking-tight text-foreground">
                Synthetic<span className="text-emerald-400">Push</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The automated GitHub commit simulator and heatmap management platform. Built with precision for developers, learners, and creators.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>All Systems Operational</span>
            </div>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 lg:gap-12">
            {footerLinks.map((link) => (
              <div key={link.title} className="flex flex-col space-y-3">
                <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-foreground">
                  {link.title}
                </h3>
                <ul className="flex flex-col space-y-2">
                  {link.links.map((subLink) => (
                    <li key={subLink.title}>
                      <Link
                        href={subLink.href}
                        className="text-sm text-muted-foreground hover:text-emerald-400 transition-colors"
                      >
                        {subLink.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

