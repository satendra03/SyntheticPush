// src/server/dtos/repo.dto.ts

export interface RepoType {
    name: string,
    description: string,
    language: string,
    stargazers_count: number,
    visibility: string,
}