// src/app/components/hero-video.tsx
"use client";

import { useEffect, useState } from "react";

export const HeroVideo = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      src="/hero.mp4"
      className="rounded-2xl w-full h-full object-cover"
    />
  );
};