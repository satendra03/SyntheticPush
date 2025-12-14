// src/app/dashboard/[username]/page.tsx
"use client";

import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { Repositories, Profile } from "@/app/components";
import { useState } from "react";

const Dashboard = () => {
  const { data: session } = useSession();
  const { username } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  if (!session) {
    return (
      <div className="container mx-auto text-center text-2xl font-bold h-[50vh] flex items-center justify-center">
        <div className="border-2 border-foreground rounded-full border-t-transparent animate-spin w-14 h-14  mx-auto"></div>
      </div>
    );
  }

  if (session?.user?.username !== username) {
    return (
      <div className="container mx-auto text-center text-2xl font-bold text-red-500 h-[50vh] flex items-center justify-center">
        <h1>You are not authorized to access this page</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <div className="grid grid-cols-1 lg:grid-cols-[30%_1fr] gap-6">
        <Profile />
        <Repositories />
      </div>
    </div>
  );
};

export default Dashboard;
