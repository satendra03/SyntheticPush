// src/app/components/footer/bottom-foot.tsx
"use client";

export const BottomFooter = () => {
  return (
    <div className="flex flex-col items-center justify-center h-10 bg-sidebar-accent w-full border-t border-border">
      <p className="text-sm text-muted-foreground font-mono">
        &copy; {new Date().getFullYear()} SyntheticPush. All rights reserved.
      </p>
    </div>
  );
};
