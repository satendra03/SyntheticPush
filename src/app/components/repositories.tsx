//

"use client";

import Link from "next/link";
import { RepoCard } from "@/app/components";
import { useParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState } from "react";
import { useGithub } from "@/hooks/useGithub";

const PER_PAGE = 6;

export const Repositories = () => {
  const { username } = useParams();
  const [page, setPage] = useState(1);
  const { useRepositories } = useGithub();
  const { data: repos = [], isLoading, error } = useRepositories(page, PER_PAGE);

  /* Removed manual fetch logic */

  if (isLoading) {
    return <Skeleton className="w-full h-full" />;
  }

  if (error) {
    return <div className="text-red-500">{error.message}</div>;
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
        {repos.map((repo, index) => (
          <Link
            href={`/dashboard/${username}/${repo.name}`}
            key={index}
            className="border rounded-lg p-3 cursor-pointer hover:scale-105 transition-all hover:shadow-lg bg-background"
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
                  className={page === repos.length ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
};
