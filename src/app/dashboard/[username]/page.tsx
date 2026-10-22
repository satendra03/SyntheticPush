// src/app/dashboard/[username]/page.tsx
"use client";

import { useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { Repositories, Profile } from "@/app/components";
import { Loader2, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const { data: session, status } = useSession();
  const { username } = useParams();
  const router = useRouter();

  const sessionUsername = (session?.user?.username || "").toLowerCase();
  const urlUsername = (Array.isArray(username) ? username[0] : username || "").toLowerCase();

  // Automatic security redirects
  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/?error=SessionExpired");
    } else if (
      status === "authenticated" &&
      sessionUsername &&
      urlUsername &&
      sessionUsername !== urlUsername
    ) {
      router.replace(`/dashboard/${sessionUsername}`);
    }
  }, [status, sessionUsername, urlUsername, router]);

  if (status === "loading") {
    return (
      <div className="container mx-auto h-[60vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-10 h-10 text-emerald-500 animate-spin" />
        <p className="text-sm font-mono text-muted-foreground">Verifying secure session...</p>
      </div>
    );
  }

  if (status === "unauthenticated" || !session) {
    return (
      <div className="container mx-auto h-[60vh] flex flex-col items-center justify-center text-center space-y-4 max-w-md p-6">
        <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-500">
          <ShieldAlert className="w-10 h-10" />
        </div>
        <h1 className="text-xl font-bold font-mono">Authentication Required</h1>
        <p className="text-xs text-muted-foreground">
          Your session has expired or you are not signed in. Redirecting to sign in...
        </p>
        <Button
          onClick={() => signIn("github")}
          className="bg-emerald-500 hover:bg-emerald-600 text-white font-mono text-xs font-semibold rounded-xl px-6 py-2"
        >
          Sign In with GitHub
        </Button>
      </div>
    );
  }

  if (sessionUsername && urlUsername && sessionUsername !== urlUsername) {
    return (
      <div className="container mx-auto h-[60vh] flex flex-col items-center justify-center text-center space-y-4 max-w-md p-6">
        <div className="p-3 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-500">
          <ShieldAlert className="w-10 h-10" />
        </div>
        <h1 className="text-xl font-bold font-mono">Access Restricted</h1>
        <p className="text-xs text-muted-foreground">
          You are signed in as <strong className="text-foreground">@{session.user?.username}</strong>. Redirecting to your personal dashboard...
        </p>
        <Button 
          onClick={() => router.replace(`/dashboard/${session.user?.username}`)}
          className="bg-emerald-500 hover:bg-emerald-600 text-white font-mono text-xs font-semibold rounded-xl px-6 py-2"
        >
          Go to Your Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8">
        <Profile />
        <Repositories />
      </div>
    </div>
  );
};

export default Dashboard;

