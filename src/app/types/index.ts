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

export interface CardType {
    title: string;
    description: string;
    icon?: React.ElementType;
}

export interface TestimonialType {
    id: string;
}