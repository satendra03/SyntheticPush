// src/app/components/repositories.tsx
"use client";

import Link from "next/link";
import { RepoCard } from "@/app/components";
import { useParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useEffect, useState } from "react";
import { RepoType } from "@/server/dtos/repo.dto";
import { mapToRepoType } from "@/server/auth/mappers/repo.mapper";
import { Search, FolderGit2, AlertCircle } from "lucide-react";

const PER_PAGE = 8;

export const Repositories = () => {
  const { username } = useParams();
  const [repos, setRepos] = useState<RepoType[]>([]);
  const [filterQuery, setFilterQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);

  const fetchRepos = async (currentPage: number) => {
    setIsLoading(true);
    setError("");
    try {
      const res = await fetch(
        `/api/github/repos?page=${currentPage}&per_page=${PER_PAGE}`
      );
      if (res.ok) {
        const data = await res.json();
        const repo = mapToRepoType(data);
        setRepos(repo as RepoType[]);
      } else {
        const errorData = await res.json().catch(() => ({}));
        setError(errorData?.message || "Failed to fetch repositories from GitHub");
      }
    } catch (err) {
      setError("Network error while loading repositories");
      console.error("Fetch repos error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRepos(page);
  }, [page]);

  const filteredRepos = repos.filter((r) =>
    r.name.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header & Filter Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border/80">
        <div>
          <h2 className="text-xl font-bold font-mono text-foreground flex items-center gap-2">
            <FolderGit2 className="w-5 h-5 text-emerald-400" />
            <span>Select Target Repository</span>
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Choose any public or private repository where SyntheticPush will dispatch commits.
          </p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            placeholder="Filter repositories..."
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            className="w-full h-9 rounded-xl border border-border/80 bg-muted/30 py-1.5 pl-8 pr-3 text-xs font-mono placeholder:text-muted-foreground/70 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/30 transition-all"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-28 rounded-2xl border border-border/60 bg-muted/20 p-4 animate-pulse space-y-3">
              <div className="h-4 bg-muted/60 rounded w-1/2"></div>
              <div className="h-3 bg-muted/40 rounded w-3/4"></div>
              <div className="h-3 bg-muted/30 rounded w-1/4"></div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="p-6 rounded-2xl border border-red-500/20 bg-red-500/10 text-red-400 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span className="text-sm font-mono">{error}</span>
        </div>
      ) : filteredRepos.length === 0 ? (
        <div className="p-12 text-center rounded-2xl border border-dashed border-border/80 bg-muted/10 space-y-2">
          <FolderGit2 className="w-8 h-8 text-muted-foreground mx-auto" />
          <p className="text-sm font-semibold">No repositories found</p>
          <p className="text-xs text-muted-foreground">Try adjusting your search query or check your GitHub permissions.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredRepos.map((repo, index) => (
            <Link
              href={`/dashboard/${username}/${repo.name}`}
              key={index}
              className="group border border-border/80 rounded-2xl bg-card/60 backdrop-blur-md hover:border-emerald-500/50 hover:bg-card/90 transition-all duration-200 hover:shadow-lg hover:shadow-emerald-500/5 hover:-translate-y-0.5"
            >
              <RepoCard repo={repo} />
            </Link>
          ))}
        </div>
      )}

      {/* Pagination */}
      <Pagination className="my-6">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (page > 1) setPage((prev) => prev - 1);
              }}
              className={page === 1 ? "pointer-events-none opacity-40 font-mono text-xs" : "font-mono text-xs cursor-pointer"}
            />
          </PaginationItem>

          <PaginationItem>
            <PaginationLink href="#" isActive className="font-mono text-xs bg-emerald-500 text-white border-emerald-500">
              Page {page}
            </PaginationLink>
          </PaginationItem>

          {repos.length === PER_PAGE && (
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setPage((prev) => prev + 1);
                }}
                className="font-mono text-xs cursor-pointer"
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
};

