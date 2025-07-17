// src/app/dashboard/[username]/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";

export const Dashboard = () => {
    const { data: session } = useSession();
    const { username } = useParams();
    const router = useRouter();
    if (!session) {
        return <div className="container mx-auto text-center text-2xl font-bold h-[50vh] flex items-center justify-center">
            <div className="border-2 border-foreground rounded-full border-t-transparent animate-spin w-14 h-14  mx-auto"></div>
        </div>;
    }
    if (session.user?.username !== username) {
        return <div className="container mx-auto text-center text-2xl font-bold text-red-500 h-[50vh] flex items-center justify-center">
            <h1>You are not authorized to access this page</h1>
            <Button variant="green" onClick={() => router.push("/")}>Go to Home</Button>
        </div>;
    }

    console.log(session);
    console.log("This is user");

    return (
        <div className="container mx-auto">
            <h1>Dashboard for {username}</h1>
            <Button variant="green" onClick={() => router.push("/api/github/repos")}>Get Repos</Button>

            {/* Repositories */}
            {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {session.user.repos.map((repo: any) => (
                    <div key={repo.id}>{repo.name}</div>
                ))}
            </div> */}
        </div>
    )
}

export default Dashboard;