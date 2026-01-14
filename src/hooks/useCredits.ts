import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { UserService } from "@/services/user.service";

export const useCredits = () => {
    const { data: session } = useSession();

    const { data: credits = 0, isLoading: loading } = useQuery({
        queryKey: ["credits", session?.user?.email],
        queryFn: UserService.getCredits,
        enabled: !!session?.user?.email,
        staleTime: 60 * 1000,
    });

    return { credits, loading };
};
