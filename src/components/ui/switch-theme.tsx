// src/app/components/switch-theme.tsx
"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const SwitchTheme = () => {
  const { setTheme, theme } = useTheme();
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="relative bg-background dark:bg-muted border border-foreground/20 dark:border-foreground/20 text-foreground"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
      </TooltipTrigger>
      <TooltipContent className="bg-background text-foreground">
        {theme === "dark" ? "Light mode" : "Dark mode"}
      </TooltipContent>
    </Tooltip>
  );
};
