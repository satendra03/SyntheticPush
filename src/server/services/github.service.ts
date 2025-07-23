// src/server/services/github.service.ts

export const getRepos = async (
  accessToken: string,
  username: string,
  page: number,
  perPage: number
) => {
  const response = await fetch(
    `https://api.github.com/users/${username}/repos?per_page=${perPage}&page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("GitHub API failed");
  }

  return await response.json();
};


export const getUser = async (accessToken: string, username: string) => {
  const response = await fetch(
    `https://api.github.com/users/${username}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const data = await response.json();
  return data;
};

export const getReadme = async (accessToken: string, username: string, repoName: string) => {
  // https://raw.githubusercontent.com/satendra03/satendra03/main/README.md
  const response = await fetch(
    `https://api.github.com/repos/${username}/${repoName}/readme`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const data = await response.json();
  return data;
};