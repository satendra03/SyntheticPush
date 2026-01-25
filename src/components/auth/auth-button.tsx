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
import { useAuth } from "@/hooks/useAuth";
import { useCredits } from "@/hooks/useCredits";
import { Loader2 } from "lucide-react";

export const AuthButton = () => {
  const { user, isAuthenticated, login, logout, isLoading: authLoading } = useAuth();
  const { credits } = useCredits();

  const handleSignIn = async () => {
    await login("github");
  };

  const handleSignOut = async () => {
    await logout();
  };

  if (!isAuthenticated) {
    return (
      <Button
        variant="outline"
        onClick={handleSignIn}
      >
        {authLoading ? <Loader2 className="animate-spin" /> : "Sign up"}
      </Button>
    );
  }

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
      <DropdownMenuContent className="w-56 text-center flex flex-col gap-2 z-[62]">
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
            {authLoading ? <Loader2 className="animate-spin" /> : "Sign out"}
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
