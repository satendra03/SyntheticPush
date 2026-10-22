// src/app/dashboard/page.tsx
"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function DashboardIndexPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated" && session?.user?.username) {
      router.replace(`/dashboard/${session.user.username}`);
    } else if (status === "unauthenticated") {
      router.replace("/?error=SessionExpired");
    }
  }, [status, session, router]);

  return (
    <div className="container mx-auto h-[60vh] flex flex-col items-center justify-center space-y-4">
      <Loader2 className="w-10 h-10 text-emerald-500 animate-spin" />
      <p className="text-sm font-mono text-muted-foreground">Redirecting to your dashboard...</p>
    </div>
  );
}
