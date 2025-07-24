// src/app/components/profile.tsx
"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { ProfileType } from "@/types";
import { Link2, Loader2 } from "lucide-react";
import Link from "next/link";

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
    try {
      setIsLoading(true);
      fetchUser();
    } catch (error) {
      console.log("Error fetching user", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="profile flex flex-col items-center p-2 gap-4">
      <div className="profile flex lg:flex-col items-center gap-2">
        <div className="profile-image rounded-full overflow-hidden">
          <Image
            src={session?.user?.avatarUrl || "/user.png"}
            alt="profile"
            width={100}
            height={100}
          />
        </div>
        <div className="name">
          <h1 className="subheading">{session?.user?.name}</h1>
          <h1 className="text-muted-foreground">{session?.user?.username}</h1>
        </div>
      </div>

      <div className="details grid grid-cols-1">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <Loader2 className="w-4 h-4 animate-spin" />
          </div>
        ) : (
          <>
            <div className="details grid grid-cols-1 text-sm gap-2">
              {user?.bio && (
                <p className="text-muted-foreground">{user?.bio}</p>
              )}
              <div className="links flex flex-col gap-2">
                {user?.blog && (
                  <div className="flex items-center gap-2">
                    <Link2 className="w-4 h-4" />
                    <Link
                      href={user?.blog || ""}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="muted-link"
                    >
                      {user?.blog}
                    </Link>
                  </div>
                )}
                {user?.twitter_username && (
                  <div className="flex items-center gap-2">
                    <Link2 className="w-4 h-4" />
                    <Link
                      href={user?.twitter_username || ""}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="muted-link"
                    >
                      {user?.twitter_username}
                    </Link>
                  </div>
                )}
                {user?.html_url && (
                  <div className="flex items-center gap-2">
                    <Link2 className="w-4 h-4" />
                    <Link
                      href={user?.html_url || ""}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="muted-link"
                    >
                      {user?.html_url}
                    </Link>
                  </div>
                )}
              </div>
              <div className="details text-sm text-muted-foreground mt-2">
                {user?.followers} Followers {user?.following} Following
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
