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
  ExternalLink,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const Profile = () => {
  const { data: session } = useSession();
  const [user, setUser] = useState<ProfileType | null>(null);
  const [credits, setCredits] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUser = async () => {
    try {
      const response = await fetch("/api/github/user");
      if (response.ok) {
        const data = await response.json();
        if (data && !data.error) {
          setUser({
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
          });
        }
      }
    } catch (err) {
      console.error("Error fetching user data:", err);
    }
  };

  const fetchCredits = async () => {
    try {
      const res = await fetch("/api/firebase/credits");
      if (res.ok) {
        const data = await res.json();
        setCredits(data.credits);
      }
    } catch (err) {
      console.error("Error fetching credits:", err);
    }
  };

  useEffect(() => {
    if (session) {
      setIsLoading(true);
      Promise.all([fetchUser(), fetchCredits()]).finally(() => {
        setIsLoading(false);
      });
    }
  }, [session]);

  if (isLoading) {
    return (
      <div className="p-8 rounded-3xl border border-border/80 bg-card/60 backdrop-blur-md flex justify-center items-center h-80">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-400" />
      </div>
    );
  }

  return (
    <div className="p-6 rounded-3xl border border-border/80 bg-card/70 backdrop-blur-xl space-y-6 shadow-xl h-fit">
      {/* Avatar Container */}
      <div className="relative w-36 h-36 sm:w-44 sm:h-44 mx-auto rounded-full p-1 border-2 border-emerald-500/30 overflow-hidden group">
        <div className="relative w-full h-full rounded-full overflow-hidden">
          <Image
            src={session?.user?.avatarUrl || "/user.png"}
            alt="profile"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="176px"
          />
        </div>
      </div>

      {/* Name and Handle */}
      <div className="text-center space-y-1">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          {session?.user?.name || user?.name || "Developer"}
        </h2>
        <p className="text-sm font-mono text-emerald-400">
          @{session?.user?.username || user?.login || "github_user"}
        </p>
      </div>

      {/* Credit Balance Card */}
      <div className="p-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-center space-y-1">
        <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider">Available Credits</span>
        <div className="text-2xl font-black font-mono text-emerald-400 flex items-center justify-center gap-1.5">
          <Zap className="w-5 h-5 fill-emerald-400" />
          <span>{credits !== null ? credits : 3}</span>
        </div>
        <Link href="/pricing" className="text-xs font-semibold text-emerald-400 hover:underline block pt-1 font-mono">
          + Get More Credits
        </Link>
      </div>

      {user?.bio && (
        <p className="text-xs text-muted-foreground leading-relaxed text-center italic">
          &ldquo;{user.bio}&rdquo;
        </p>
      )}

      {/* GitHub Profile Button */}
      {user?.html_url && (
        <Link href={user.html_url} target="_blank" rel="noopener noreferrer" className="block w-full">
          <Button variant="outline" className="w-full text-xs font-semibold border-border/80 hover:bg-muted/80 flex items-center justify-center gap-1.5 rounded-xl py-5">
            <span>View GitHub Profile</span>
            <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
          </Button>
        </Link>
      )}

      {/* Followers & Social stats */}
      <div className="flex items-center justify-center gap-3 text-xs text-muted-foreground font-mono pt-2 border-t border-border/50">
        <div className="flex items-center gap-1">
          <Users className="w-3.5 h-3.5 text-emerald-400" />
          <strong className="text-foreground">{user?.followers || 0}</strong> followers
        </div>
        <span>·</span>
        <div>
          <strong className="text-foreground">{user?.following || 0}</strong> following
        </div>
      </div>

      {/* Metadata list */}
      <div className="space-y-2 text-xs text-muted-foreground font-mono pt-2 border-t border-border/50">
        {user?.company && (
          <div className="flex items-center gap-2">
            <Building2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
            <span className="truncate">{user.company}</span>
          </div>
        )}
        {user?.location && (
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
            <span className="truncate">{user.location}</span>
          </div>
        )}
        {user?.blog && (
          <div className="flex items-center gap-2">
            <LinkIcon className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
            <Link
              href={user.blog.startsWith("http") ? user.blog : `https://${user.blog}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:underline truncate"
            >
              {user.blog.replace(/^https?:\/\//, "")}
            </Link>
          </div>
        )}
        {user?.twitter_username && (
          <div className="flex items-center gap-2">
            <Twitter className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
            <Link
              href={`https://twitter.com/${user.twitter_username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:underline truncate"
            >
              @{user.twitter_username}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

