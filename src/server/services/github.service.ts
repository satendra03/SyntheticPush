// src/server/services/github.service.ts

export const getRepos = async (
  accessToken: string,
  username: string,
  page: number,
  perPage: number
) => {
  const headers: Record<string, string> = {
    "User-Agent": "SyntheticPush/2.0",
    Accept: "application/vnd.github.v3+json",
  };

  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  // Primary: /user/repos returns authenticated user's repos (including private/org)
  const primaryUrl = accessToken
    ? `https://api.github.com/user/repos?per_page=${perPage}&page=${page}&sort=updated&affiliation=owner,collaborator`
    : `https://api.github.com/users/${username}/repos?per_page=${perPage}&page=${page}`;

  const response = await fetch(primaryUrl, { headers });

  if (response.ok) {
    return await response.json();
  }

  // Fallback to /users/{username}/repos if /user/repos fails
  if (username) {
    const fallbackUrl = `https://api.github.com/users/${username}/repos?per_page=${perPage}&page=${page}`;
    const fallbackResponse = await fetch(fallbackUrl, { headers });
    if (fallbackResponse.ok) {
      return await fallbackResponse.json();
    }
  }

  const errText = await response.text();
  console.error("GitHub API getRepos error:", response.status, errText);
  throw new Error(`GitHub API failed: ${response.status}`);
};

export const getUser = async (accessToken: string, username: string) => {
  const headers: Record<string, string> = {
    "User-Agent": "SyntheticPush/2.0",
    Accept: "application/vnd.github.v3+json",
  };

  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  const primaryUrl = accessToken
    ? `https://api.github.com/user`
    : `https://api.github.com/users/${username}`;

  const response = await fetch(primaryUrl, { headers });

  if (response.ok) {
    return await response.json();
  }

  // Fallback to /users/{username}
  if (username) {
    const fallbackUrl = `https://api.github.com/users/${username}`;
    const fallbackResponse = await fetch(fallbackUrl, { headers });
    if (fallbackResponse.ok) {
      return await fallbackResponse.json();
    }
  }

  const errText = await response.text();
  console.error("GitHub API getUser error:", response.status, errText);
  return null;
};

export const getReadme = async (accessToken: string, username: string, repoName: string) => {
  const headers: Record<string, string> = {
    "User-Agent": "SyntheticPush/2.0",
    Accept: "application/vnd.github.v3+json",
  };

  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  const response = await fetch(
    `https://api.github.com/repos/${username}/${repoName}/readme`,
    { headers }
  );

  if (!response.ok) {
    return null;
  }
  return await response.json();
};