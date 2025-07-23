// src/app/components/readme.tsx
"use client";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { marked } from "marked";
import { Skeleton } from "@/components/ui/skeleton";

export const Readme = () => {
  const [readme, setReadme] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchReadme = async () => {
    const response = await fetch(`/api/github/readme`);
    const data = await response.json();
    const decodedData = atob(data);
    setReadme(decodedData);
  };

  useEffect(() => {
    try {
      setIsLoading(true);
      fetchReadme();
    } catch (error) {
      setError(error as string);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return <Skeleton className="w-full h-full" />;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="readme mb-5 lg:mb-10">
      {isLoading ? (
        <div className="loading">
          <Loader2 className="w-4 h-4 animate-spin" />
        </div>
      ) : (
        <div className="border-2 p-3 rounded-lg text-center">
          <div dangerouslySetInnerHTML={{ __html: marked.parse(readme) }} />
        </div>
      )}
    </div>
  );
};
