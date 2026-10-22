"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Loader2, Zap, LayoutDashboard, LogOut, PlusCircle } from "lucide-react";
import { GitHubIcon } from "@/icons";
import Link from "next/link";

export const AuthButton = () => {
  const { data: session } = useSession();
  const [credits, setCredits] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCredits = async () => {
      if (session) {
        try {
          const res = await fetch("/api/firebase/credits");
          if (res.ok) {
            const data = await res.json();
            setCredits(data.credits);
          }
        } catch (error) {
          console.error("Failed to fetch credits:", error);
        }
      }
    };
    fetchCredits();
  }, [session]);

  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      await signIn("github");
    } catch (error) {
      console.error("Sign in failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await signOut();
    } catch (error) {
      console.error("Sign out failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!session) {
    return (
      <Button
        onClick={handleSignIn}
        className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium text-xs sm:text-sm px-3.5 py-2 h-9 rounded-lg transition-all duration-200 hover:shadow-md hover:shadow-emerald-500/20 active:scale-95 cursor-pointer flex items-center gap-2"
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <>
            <GitHubIcon className="w-4 h-4 fill-white" />
            <span>Sign in with GitHub</span>
          </>
        )}
      </Button>
    );
  }

  const user = session.user;
  const avatarUrl = user?.avatarUrl || "";

  return (
    <div className="flex items-center gap-2.5">
      {/* Credits pill */}
      <Link
        href={user?.username ? `/dashboard/${user.username}` : "/pricing"}
        className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-400 transition-colors"
        title="Your available commit credits"
      >
        <Zap className="w-3.5 h-3.5 fill-emerald-400 text-emerald-400 animate-pulse" />
        <span>{credits !== null ? credits : 3}</span>
        <span className="hidden sm:inline text-muted-foreground font-normal">Credits</span>
      </Link>

      {/* User Profile Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none cursor-pointer relative group">
          <div className="relative">
            <Avatar className="w-8.5 h-8.5 ring-2 ring-border group-hover:ring-emerald-500/50 transition-all">
              <AvatarImage src={avatarUrl} alt={user?.name || "User"} />
              <AvatarFallback className="bg-muted text-xs font-bold">
                {user?.username?.[0]?.toUpperCase() ||
                  user?.name?.[0]?.toUpperCase() ||
                  "U"}
              </AvatarFallback>
            </Avatar>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-background"></span>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 p-2 rounded-xl border border-border bg-card/95 backdrop-blur-xl shadow-xl">
          <DropdownMenuLabel className="px-2 py-1.5 font-normal">
            <div className="flex flex-col space-y-0.5">
              <p className="text-sm font-semibold text-foreground leading-none">{user?.name || "Developer"}</p>
              <p className="text-xs font-mono text-muted-foreground leading-none truncate">
                @{user?.username || "github_user"}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          <DropdownMenuItem asChild>
            <Link
              href={user?.username ? `/dashboard/${user.username}` : "/"}
              className="flex items-center gap-2 px-2 py-1.5 text-xs font-medium cursor-pointer rounded-lg hover:bg-muted/80 text-foreground"
            >
              <LayoutDashboard className="w-4 h-4 text-emerald-400" />
              <span>Repositories Dashboard</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link
              href="/pricing"
              className="flex items-center gap-2 px-2 py-1.5 text-xs font-medium cursor-pointer rounded-lg hover:bg-muted/80 text-foreground"
            >
              <PlusCircle className="w-4 h-4 text-emerald-400" />
              <span>Get More Credits</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={handleSignOut}
            className="flex items-center gap-2 px-2 py-1.5 text-xs font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 cursor-pointer rounded-lg transition-colors"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogOut className="w-4 h-4" />}
            <span>Sign out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

