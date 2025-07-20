// src/app/context/user-context.tsx
"use client"

import { createContext, useContext, useState, ReactNode } from "react";
import { User, UserContextType } from "@/types";


const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const Values = {
        user,
        setUser,
        isLoading,
        setIsLoading,
        error,
        setError,
        isAuthenticated,
        setIsAuthenticated
    }

    return (
        <UserContext.Provider value={Values}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
}

