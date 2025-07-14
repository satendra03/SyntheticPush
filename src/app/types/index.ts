// src/app/types/index.ts

// Footer
export interface Link {
    title: string;
    href: string;
    icon?: React.ElementType;
}

export interface FooterLink {
    title: string;
    links: Link[];
}