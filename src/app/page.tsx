// src/app/page.tsx
import { Button } from "@/components/ui/button";
import { SwitchTheme } from "./components/switch-theme";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-2">
      <Button variant="green">Sign up for GitHub</Button>
      <Button variant="dark">Sign up for GitHub</Button>
      <Button variant="noOutline">Sign up for GitHub</Button>
      <Button variant="outline">Sign up for GitHub</Button>
      <SwitchTheme />
    </div>
  );
}
