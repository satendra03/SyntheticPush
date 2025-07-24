// src/server/auth/mappers/repo.mapper.ts

import { RepoType } from "@/server/dtos/repo.dto";

export const mapToRepoType = (repo: any): RepoType[] => {
    return repo.map((repo: any) => ({
        name: repo.name,
        description: repo.description,
        language: repo.language,
        stargazers_count: repo.stargazers_count,
        visibility: repo.visibility,
    }))
}