"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export const useCredits = () => {
  const { data: session } = useSession();
  const [credits, setCredits] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!session?.user?.username) {
      setCredits(0);
      return;
    }

    const fetchCredits = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/firebase/credits");
        if (!response.ok) {
          throw new Error("Failed to fetch credits");
        }
        const data = await response.json();
        setCredits(data.credits || 0);
      } catch (err) {
        console.error("Error fetching credits:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCredits();
  }, [session?.user?.username]);

  return { credits, isLoading, error };
};
