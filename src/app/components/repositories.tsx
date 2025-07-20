// src/app/components/repositories.tsx
"use client";

import Link from "next/link";
import REPO from "../../../public/REPO.json";
import { RepoCard } from "@/app/components";
import { useParams } from "next/navigation";

export const Repositories = () => {
  const { username } = useParams();
  return (
    <div className="">
      <h1 className="text-center subheading">Select a repository</h1>
      <p className="text-center caption mb-3">
        Select a light-weight repository
      </p>
      <div className="grid grid-cols-1 gap-4">
        {REPO.map((repo: any, index: number) => (
          <Link
            href={`/dashboard/${username}/${repo.name}`}
            key={repo.id}
            className={`border rounded-lg p-3 cursor-pointer hover:scale-105 transition-all hover:shadow-xl bg-background`}
          >
            <RepoCard repo={repo} />
          </Link>
        ))}
      </div>
    </div>
  );
};
