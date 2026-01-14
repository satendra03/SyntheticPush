import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { UserService } from "@/services/user.service";

export const useCredits = () => {
    const { data: session } = useSession();
    const [credits, setCredits] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCredits = async () => {
            if (session?.user) {
                setLoading(true);
                try {
                    const userCredits = await UserService.getCredits();
                    setCredits(userCredits);
                } catch (error) {
                    console.error("Failed to fetch credits:", error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchCredits();
    }, [session]);

    return { credits, loading };
};
