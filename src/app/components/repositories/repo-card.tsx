// src/app/components/repositories/repo-card.tsx
"use client";

import { Badge } from "@/components/ui/badge";
import { Star, ArrowRight, FolderGit2 } from "lucide-react";
import { RepoType } from "@/server/dtos/repo.dto";

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f7df1e",
  Python: "#3572A5",
  Rust: "#dea584",
  Go: "#00ADD8",
  Java: "#b07219",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Vue: "#41b883",
  Ruby: "#701516",
  C: "#555555",
  "C++": "#f34b7d",
  "C#": "#178600",
  PHP: "#4F5D95",
  Kotlin: "#A97BFF",
  Swift: "#F05138",
};

export const RepoCard = ({ repo }: { repo: RepoType }) => {
  const langColor = repo.language ? LANGUAGE_COLORS[repo.language] || "#22c55e" : "#22c55e";

  return (
    <div className="flex flex-col justify-between gap-3 p-4">
      {/* Top row: Icon, Name & Visibility */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <FolderGit2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <h3 className="font-semibold text-base font-mono text-emerald-400 hover:underline truncate">
            {repo.name}
          </h3>
          <Badge
            variant="outline"
            className="text-[10px] px-2 py-0.5 rounded-full font-mono text-muted-foreground border-border/80 bg-muted/30 capitalize flex-shrink-0"
          >
            {repo.visibility || "public"}
          </Badge>
        </div>

        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center text-xs font-mono text-emerald-400 gap-1 flex-shrink-0">
          <span>Push</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* Description */}
      <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
        {repo.description || "No description provided for this repository."}
      </p>

      {/* Bottom stats row */}
      <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2 border-t border-border/40 font-mono">
        {repo.language && (
          <div className="flex items-center gap-1.5">
            <span
              className="w-2.5 h-2.5 rounded-full inline-block"
              style={{ backgroundColor: langColor }}
            />
            <span>{repo.language}</span>
          </div>
        )}

        {repo.stargazers_count !== undefined && repo.stargazers_count > 0 && (
          <div className="flex items-center gap-1 hover:text-foreground transition-colors">
            <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
            <span>{repo.stargazers_count}</span>
          </div>
        )}
      </div>
    </div>
  );
};

