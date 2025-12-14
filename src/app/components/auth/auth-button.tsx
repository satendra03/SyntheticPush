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
import { Loader2 } from "lucide-react";

export const AuthButton = () => {
  const { data: session } = useSession();
  const [credits, setCredits] = useState(0);
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
        variant="outline"
        onClick={handleSignIn}
      >
        {isLoading ? <Loader2 className="animate-spin" /> : "Sign up"}
      </Button>
    );
  }

  const user = session.user;
  const avatarUrl = user?.avatarUrl || "";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none cursor-pointer">
        <Avatar>
          <AvatarImage src={avatarUrl} alt={user?.name || "User"} />
          <AvatarFallback>
            {user?.username?.[0]?.toUpperCase() ||
              user?.name?.[0]?.toUpperCase() ||
              "U"}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 text-center flex flex-col gap-2">
        <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <div className="flex items-center justify-center gap-2">
            <span>Available Credits:</span>
            <span className="font-bold text-green-500">{credits}</span>
            <span>Credits</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Button
            variant="outline"
            className="outline-none cursor-pointer"
            onClick={handleSignOut}
          >
            {isLoading ? <Loader2 className="animate-spin" /> : "Sign out"}
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
