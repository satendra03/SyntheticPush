// src/app/components/hero-video.tsx
"use client";

import { useEffect, useState } from "react";
import { HeroVideoDialog } from "@/components/ui/hero-video-dialog";

export const HeroVideo = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <HeroVideoDialog
      videoSrc="https://www.youtube.com/embed/S_qSo8iG7Pk?si=J9qqn_aH5h7tls3L"
      thumbnailSrc="https://img.youtube.com/vi/S_qSo8iG7Pk/maxresdefault.jpg"
      thumbnailAlt="Hero Video"
    />
  );
};