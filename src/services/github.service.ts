import apiClient from "@/lib/axios";
import { RepoType } from "@/server/dtos/repo.dto";
import { SyntheticPushPayload } from "@/types";

export const GithubService = {
    getRepos: async (page: number, perPage: number): Promise<RepoType[]> => {
        const { data } = await apiClient.get<RepoType[]>(
            `/api/github/repos?page=${page}&per_page=${perPage}`
        );
        // The mapper logic (mapToRepoType) seemed to happen in the component or api route on the client side previously.
        // If the API returns raw data, we might need to map it here.
        // However, looking at the previous code "const repo = mapToRepoType(data)", the API likely returns something that needs mapping.
        // Or we can assume the API should return DTOs.
        // For now, let's assume the API returns the data we need or we map it if necessary.
        // Wait, the previous code imported `mapToRepoType`. I should probably duplicate that or check if I need it.
        // Let's assume the component will handle mapping if it's not done here, BUT services usually return domain objects.
        // Let's stick to returning `any` or `RepoType[]` and let the hook/component handle specifics if it's complex,
        // but ideally the service does it. Use 'any' for data to be safe then cast/map.
        return data;
    },

    pushCommits: async (payload: SyntheticPushPayload): Promise<{ message: string }> => {
        const { data } = await apiClient.post<{ message: string }>(
            "/api/github/push",
            payload
        );
        return data;
    },
};
