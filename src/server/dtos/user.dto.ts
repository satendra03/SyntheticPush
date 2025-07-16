// src/server/dtos/user.dto.ts

export interface GitHubInfo {
    id: string;
    username: string;
    avatarUrl: string;
    profileUrl: string;
  }
  
  export interface TwitterInfo {
    handle: string;
    profileUrl: string;
  }
  
  export interface CreateUserDTO {
    github: GitHubInfo;
    twitter?: TwitterInfo;
  }
  