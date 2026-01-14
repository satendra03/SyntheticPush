import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";

export const useAuth = () => {
    const { data: session, status } = useSession();
    const [isLoading, setIsLoading] = useState(false);

    const login = async (provider: string = "github") => {
        setIsLoading(true);
        try {
            await signIn(provider);
        } catch (error) {
            console.error("Login failed:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        setIsLoading(true);
        try {
            await signOut();
        } catch (error) {
            console.error("Logout failed:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        session,
        isAuthenticated: status === "authenticated",
        user: session?.user,
        isLoading: status === "loading" || isLoading,
        login,
        logout,
    };
};
