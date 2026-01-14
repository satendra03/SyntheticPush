import apiClient from "@/lib/axios";

export interface UserCreditsResponse {
    credits: number;
}

export const UserService = {
    getCredits: async (): Promise<number> => {
        const { data } = await apiClient.get<UserCreditsResponse>("/api/firebase/credits");
        return data.credits;
    },
};
