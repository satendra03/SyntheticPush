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

  // export interface CompleteUser extends UserModel {
  

  // User Context
  export interface UserContextType {
    user: User | null;
    setUser: (user: User | null) => void;
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
    isAuthenticated: boolean;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
    error: string | null;
    setError: (error: string | null) => void;
  }