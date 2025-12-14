// src/app/components/footer/bottom-foot.tsx
"use client";

export const BottomFooter = () => {
  return (
    <div className="text-xs flex flex-col items-center justify-center bg-sidebar-accent w-full border-t border-border">

      <div className="text-center my-3">
          <p className="text-muted-foreground font-mono">
            Made with ❤️ for developers, by developer.<br />
            Have questions or want to contribute? <a href="/contact" className="link">Contact us</a>.
          </p>
        </div>
        
      <p className="text-muted-foreground font-mono mb-3">
        &copy; {new Date().getFullYear()} SyntheticPush. All rights reserved.
      </p>
    </div>
  );
};
