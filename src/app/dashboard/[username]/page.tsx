// src/app/dashboard/[username]/page.tsx
"use client";

import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Repositories, Profile, Readme } from "@/app/components";

export const Dashboard = () => {
  const { data: session } = useSession();
  const { username } = useParams();

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
    <div className="container mx-auto">

      <Tabs defaultValue="repositories" className="">
        <TabsList className="w-full mb-5">
          <TabsTrigger value="overview" className="w-full">Overview</TabsTrigger>
          <TabsTrigger value="repositories" className="w-full">Repositories</TabsTrigger>
        </TabsList>
        
        <div className="grid grid-cols-1 lg:grid-cols-[30%_1fr] gap-2">
            <Profile />
        <TabsContent value="overview">
          <Readme />
        </TabsContent>
        <TabsContent value="repositories" className="w-full">
          <Repositories />
        </TabsContent>
        </div>
      </Tabs>

     
    </div>
  );
};

export default Dashboard;
