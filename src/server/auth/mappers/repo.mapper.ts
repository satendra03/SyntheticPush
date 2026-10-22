// src/server/auth/mappers/repo.mapper.ts

import { RepoType } from "@/server/dtos/repo.dto";

export const mapToRepoType = (repo: any): RepoType[] => {
    if (!Array.isArray(repo)) {
        return [];
    }
    return repo.map((r: any) => ({
        name: r.name,
        description: r.description,
        language: r.language,
        stargazers_count: r.stargazers_count,
        visibility: r.visibility,
    }));
};