// src/app/components/card/card.tsx
"use client";

import { CardType } from "@/types";
import { cn } from "@/lib/utils";

export const Card = ({
  data: { title, description, icon: Icon },
  index,
}: {
  data: CardType;
  index: number;
  borderTop?: boolean;
  borderBottom?: boolean;
  colorTop?: boolean;
  colorBottom?: boolean;
}) => {
  return (
    <div
      className={cn(
        "relative flex flex-col justify-between p-6 sm:p-8 rounded-2xl border border-border/80 bg-card/60 backdrop-blur-xl transition-all duration-300 group hover:border-emerald-500/50 hover:bg-card/90 hover:shadow-xl hover:shadow-emerald-500/5 hover:-translate-y-1 overflow-hidden"
      )}
    >
      {/* Background ambient gradient glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <div>
        {/* Icon & Index Badge */}
        <div className="flex items-center justify-between mb-6">
          <div className="p-3 rounded-xl bg-muted/80 dark:bg-white/5 border border-border/70 text-emerald-400 group-hover:bg-emerald-500/10 group-hover:border-emerald-500/30 group-hover:scale-110 transition-all duration-300 shadow-sm">
            {Icon && <Icon className="w-6 h-6 text-emerald-400" />}
          </div>
          <span className="text-xs font-mono font-bold text-muted-foreground/60 group-hover:text-emerald-400/80 transition-colors">
            0{index + 1}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold tracking-tight mb-2.5 text-foreground group-hover:text-emerald-400 transition-colors duration-200">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>

      {/* Bottom Accent line */}
      <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
};