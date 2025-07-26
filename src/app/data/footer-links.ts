// src/app/data/footer-links.ts
import { FooterLink } from "@/types";

export const footerLinks: FooterLink[] = [
    {
        title: "Product",
        links: [
            { title: "Features", href: "/features" },
        ],
    },
    {
        title: "Platform",
        links: [
            { title: "Pricing", href: "/pricing" },

        ],
    },
    {
        title: "Support",
        links: [
            { title: "Contact Us", href: "/contact" },
        ],
    },
    {
        title: "Company",
        links: [
            { title: "About", href: "/about" },
            { title: "Careers", href: "/careers" },
            { title: "Privacy Policy", href: "/privacy-policy" },
            { title: "Terms of Use", href: "/terms-of-use" },
            { title: "Refund & Return Policy", href: "/refund-return-policy" },
        ],
    },
];
