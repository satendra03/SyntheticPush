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
    name: string;
    image: string;
    text: string;
    rating: number;
}

export interface History {
    type: string;
    value: number;
    createdAt: string;
}

export interface User {
    id: string;
    username: string;
    avatarUrl: string;
    credits: number;
    joinedAt: string;
    history: History[];
}