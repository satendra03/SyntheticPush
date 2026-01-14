import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { GithubService } from "@/services/github.service";
import { SyntheticPushPayload } from "@/types";
import { mapToRepoType } from "@/server/auth/mappers/repo.mapper";
// Note: Importing from @/server might be an issue if it contains server-only code (like headers/cookies).
// If mapToRepoType is pure helper, it's fine.

export const useGithub = () => {
    const queryClient = useQueryClient();

    const useRepositories = (page: number, perPage: number) => {
        return useQuery({
            queryKey: ["repos", page, perPage],
            queryFn: async () => {
                const data = await GithubService.getRepos(page, perPage);
                // We know from previous code it used mapToRepoType.
                return mapToRepoType(data);
            },
            staleTime: 60 * 1000,
        });
    };

    const usePushCommits = () => {
        return useMutation({
            mutationFn: (payload: SyntheticPushPayload) => GithubService.pushCommits(payload),
            onSuccess: () => {
                // Invalidate credits query to trigger refetch
                queryClient.invalidateQueries({ queryKey: ["credits"] });
                // Optionally invalidate repos if pushing changes something there (unlikely for synthetic push but good practice)
            },
        });
    };

    return { useRepositories, usePushCommits };
};
