// src/app/components/repositories.tsx
"use client";

import REPO from "../../../public/REPO.json";
import { RepoCard } from "@/app/components";

export const Repositories = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {REPO.map((repo: any, index: number) => (
          <div
            key={repo.id}
            className={`border border-foreground/50 border-l-transparent border-r-transparent ${
              index == 0 && "border-t"
            } `}
          >
            <RepoCard repo={repo} />
          </div>
        ))}
      </div>
    )
}