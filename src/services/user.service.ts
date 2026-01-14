import { ApiService } from "./api.service";

export interface UserCreditsResponse {
    credits: number;
}

export const UserService = {
    getCredits: async (): Promise<number> => {
        const data = await ApiService.get<UserCreditsResponse>("/api/firebase/credits");
        return data.credits;
    },
};
