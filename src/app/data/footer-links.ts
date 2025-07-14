// src/app/data/footer-links.ts
import { FooterLink } from "../types";

export const footerLinks: FooterLink[] = [
    {
        title: "Product",
        links: [
            { title: "Features", href: "/features" },
            { title: "Enterprise", href: "/enterprise" },
        ],
    },
    {
        title: "Platform",
        links: [
            { title: "How It Works", href: "/how-it-works" },
            { title: "Pricing", href: "/pricing" },
            { title: "Blog", href: "/blog" },

        ],
    },
    {
        title: "Support",
        links: [
            { title: "Documentation", href: "/docs" },
            { title: "FAQ", href: "/faq" },
            { title: "Contact Us", href: "/contact" },
        ],
    },
    {
        title: "Company",
        links: [
            { title: "About", href: "/about" },
            { title: "Careers", href: "/careers" },
            { title: "Blog", href: "/blog" },
            { title: "Press", href: "/press" },
            { title: "Investors", href: "/investors" },
            { title: "Privacy Policy", href: "/privacy-policy" },
            { title: "Terms of Service", href: "/terms-of-service" },
        ],
    },
];
