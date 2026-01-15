export const UserService = {
    getCredits: async (): Promise<number> => {
        const response = await fetch("/api/firebase/credits");
        const data = await response.json();
        return data.credits;
    },
};
