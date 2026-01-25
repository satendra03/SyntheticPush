"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useCallback, useState } from "react";

export const useAuth = () => {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const isAuthenticated = status === "authenticated";

  const login = useCallback(
    async (provider: string) => {
      setIsLoading(true);
      try {
        await signIn(provider, { callbackUrl: "/dashboard" });
      } catch (error) {
        console.error("Login error:", error);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await signOut({ callbackUrl: "/" });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    user: session?.user,
    isAuthenticated,
    login,
    logout,
    isLoading,
    status,
  };
};
