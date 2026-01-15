import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { UserService } from "@/services/user.service";

export const useCredits = () => {
    const { data: session } = useSession();

    const { data: credits = 0, isLoading: loading } = useQuery({
        queryKey: ["credits", session?.user?.username],
        queryFn: UserService.getCredits,
        enabled: !!session?.user?.username,
        staleTime: 60 * 1000,
    });

    return { credits, loading };
};
