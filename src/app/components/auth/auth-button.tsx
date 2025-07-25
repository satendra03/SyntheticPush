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

  useEffect(()=>{
    const fetchCredits = async () => {
      const res = await fetch("/api/firebase/credits");
      const data = await res.json();
      setCredits(data.credits);
    };
    fetchCredits();
  }, [])

  if (!session) {
    return (
      <Button variant="outline" onClick={() => {
        setIsLoading(true);
        setTimeout(()=>{
          signIn("github");
          setIsLoading(false);
        }, 2000);
      }}>
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
            onClick={() => { signOut() }}
          >
            Sign out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
