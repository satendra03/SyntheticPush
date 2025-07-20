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
    name?: string | null;
    email?: string;
    username: string;
    avatarUrl: string;
    accessToken: string;
    credits: number;
  }

  export interface ProfileType {
    id: number;
    name: string;
    bio: string;
    blog: string;
    company: string;
    email: string;
    followers: number;
    following: number;
    html_url: string;
    location: string;
    login: string;
    twitter_username: string;
  }