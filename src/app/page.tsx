// src/app/page.tsx
import { Button } from "@/components/ui/button";
import { SwitchTheme } from "./components/switch-theme";

export default function Home() {

  

  return (
    <div className="flex flex-col items-center h-[300vh] gap-2">
      <h1 className="title mt-20">SyntheticPush</h1>
      <p className="body">Create you own commits on GitHub</p>
      <Button variant="green">Sign up for GitHub</Button>
      <Button variant="dark">Sign up for GitHub</Button>
      <Button variant="noOutline">Sign up for GitHub</Button>
      <Button variant="outline">Sign up for GitHub</Button>
      <SwitchTheme />
    </div>
  );
}
