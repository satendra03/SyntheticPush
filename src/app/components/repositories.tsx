//

"use client";

import Link from "next/link";
import { RepoCard } from "@/app/components";
import { useParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useEffect, useState } from "react";

const PER_PAGE = 15;

export const Repositories = () => {
  const { username } = useParams();
  const [repos, setRepos] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);

  const fetchRepos = async (currentPage: number) => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `/api/github/repos?page=${currentPage}&per_page=${PER_PAGE}`
      );
      const data = await res.json();
      setRepos(data);
    } catch (err) {
      setError("Failed to fetch repositories");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRepos(page);
  }, [page]);

  if (isLoading) {
    return <Skeleton className="w-full h-full" />;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div>
      <h1 className="text-center subheading mt-10 lg:mt-0">
        Select a repository
      </h1>
      <p className="text-center caption mb-3">
        Use a new light-weight repository to push your code
      </p>

      <div className="grid grid-cols-1 gap-4">
        {repos.map((repo) => (
          <Link
            href={`/dashboard/${username}/${repo.name}`}
            key={repo.id}
            className="border rounded-lg p-3 cursor-pointer hover:scale-105 transition-all hover:shadow-xl bg-background"
          >
            <RepoCard repo={repo} />
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <Pagination className="my-5">
        <PaginationContent>
          {/* Previous button */}
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (page > 1) setPage((prev) => prev - 1);
              }}
              className={page === 1 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>

          {/* Current page number */}
          <PaginationItem>
            <PaginationLink href="#" isActive>
              {page}
            </PaginationLink>
          </PaginationItem>

          {/* Show ellipsis if next page might exist */}
          {repos.length === PER_PAGE && (
            <>
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage((prev) => prev + 1);
                  }}
                />
              </PaginationItem>
            </>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
};
