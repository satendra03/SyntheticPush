// src/app/components/profile.tsx
"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { ProfileType } from "@/types";
import {
  Link as LinkIcon,
  Loader2,
  MapPin,
  Building2,
  Users,
  Twitter,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const Profile = () => {
  const { data: session } = useSession();
  const [user, setUser] = useState<ProfileType | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUser = async () => {
    const response = await fetch("/api/github/user");
    const data = await response.json();
    const user = {
      id: data?.id,
      name: data?.name,
      bio: data?.bio,
      blog: data?.blog,
      company: data?.company,
      email: data?.email,
      followers: data?.followers,
      following: data?.following,
      html_url: data?.html_url,
      location: data?.location,
      login: data?.login,
      twitter_username: data?.twitter_username,
    };
    setUser(user);
  };

  useEffect(() => {
    if (session) {
      try {
        setIsLoading(true);
        fetchUser();
      } catch (error) {
        console.log("Error fetching user", error);
      } finally {
        setIsLoading(false);
      }
    }
  }, [session]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="relative w-full aspect-square max-w-[296px] mx-auto lg:mx-0 rounded-full overflow-hidden border border-border">
        <Image
          src={session?.user?.avatarUrl || "/user.png"}
          alt="profile"
          fill
          className="object-cover"
        />
      </div>

      <div>
        <h1 className="text-2xl font-bold leading-tight">
          {session?.user?.name}
        </h1>
        <p className="text-xl text-muted-foreground font-light">
          {session?.user?.username}
        </p>
      </div>

      {user?.bio && <p className="text-base">{user.bio}</p>}

      <Button variant="outline" className="w-full">
        Edit profile
      </Button>

      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Users className="w-4 h-4" />
        <span className="font-bold text-foreground">{user?.followers}</span> followers
        <span>·</span>
        <span className="font-bold text-foreground">{user?.following}</span> following
      </div>

      <div className="flex flex-col gap-1 text-sm">
        {user?.company && (
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-muted-foreground" />
            <span>{user.company}</span>
          </div>
        )}
        {user?.location && (
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span>{user.location}</span>
          </div>
        )}
        {user?.email && (
          <div className="flex items-center gap-2">
            {/* Email icon if needed, though not in standard imports above, usually Mail */}
            {/* <span>{user.email}</span> */}
          </div>
        )}
        {user?.blog && (
          <div className="flex items-center gap-2">
            <LinkIcon className="w-4 h-4 text-muted-foreground" />
            <Link
              href={user.blog.startsWith("http") ? user.blog : `https://${user.blog}`}
              target="_blank"
              rel="noopener noreferrer"
              className="muted-link"
            >
              {user.blog}
            </Link>
          </div>
        )}
        {user?.twitter_username && (
          <div className="flex items-center gap-2">
            <Twitter className="w-4 h-4 text-muted-foreground" />
            <Link
              href={`https://twitter.com/${user.twitter_username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="muted-link"
            >
              @{user.twitter_username}
            </Link>
          </div>
        )}
        {/* Placeholder for LinkedIn/Instagram if they were in the API response, but standard GitHub API doesn't usually provide them explicitly unless in bio or blog */}
      </div>
    </div>
  );
};
