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
  
  // Updated User interface
  export interface User {
    id: string;
    name?: string;
    email?: string;
    image?: string;
    username: string;
    avatarUrl: string;
    credits: number;
    joinedAt?: string; // optional if not always present
    history?: History[]; // optional if not always fetched
  }
  