// src/app/providers/session-provider.tsx
"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

export function SessionWrapper({ children }: { children: ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
