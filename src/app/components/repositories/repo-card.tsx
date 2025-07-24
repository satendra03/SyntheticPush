// src/app/components/repo-card.tsx
"use client";

import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { RepoType } from "@/server/dtos/repo.dto";

export const RepoCard = ({ repo }: { repo: RepoType }) => {
  return (
    <div className="p-2 grid grid-cols-[90%_1fr]">
      {/* left side */}
      <div className=" flex flex-col justify-between gap-2 ">
        <div className="flex flex-col justify-between">
          <div className="repo-title flex items-center gap-2">
            <h1 className="subheading text-blue-400">{repo.name}</h1>
            <Badge variant="outline" className="rounded-full font-bold">
              {repo.visibility}
            </Badge>
          </div>
          <p className="caption">{repo.description}</p>
        </div>
        <div className="stats flex items-center gap-2">
          {repo.language && <Badge variant="outline">{repo.language}</Badge>}
          {repo.stargazers_count != 0 && (
            <div className="flex items-center caption gap-1">
              <Star size={15} /> {repo.stargazers_count}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
