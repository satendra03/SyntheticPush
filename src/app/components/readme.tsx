// src/app/components/readme.tsx
"use client";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { marked } from "marked";

export const Readme = () => {
  const [readme, setReadme] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchReadme = async () => {
    const response = await fetch(`/api/github/readme`);
    console.log("This is response", response);
    const data = await response.json();
    const decodedData = atob(data);
    console.log("This is data", decodedData);
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

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="readme">
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
