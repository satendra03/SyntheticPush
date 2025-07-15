// src/app/components/card/card.tsx
"use client";

import { CardType } from "@/app/types";
import { cn } from "@/lib/utils";

export const Card = ({
    data: { title, description, icon: Icon},
    index,
    borderTop,
    borderBottom,
    colorTop,
    colorBottom,
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
          "flex flex-col lg:border-r py-10 relative group/feature dark:border-border",
          borderTop && "lg:border-t dark:border-border",
          borderBottom && "lg:border-b dark:border-border",
          "lg:border-l dark:border-border hover:text-black dark:hover:text-white",
        )}
      >
        {index < 4 && (
          <div className={cn(
            "opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full  from-green-100 dark:from-green-800 to-transparent pointer-events-none",
            colorTop && "bg-gradient-to-b",
            colorBottom && "bg-gradient-to-t",
          )} />
        )}
        <div className="mb-4 relative z-10 px-10 group-hover/feature:translate-x-2 transition duration-200">
          {Icon && <Icon />}
        </div>
        <div className="text-lg font-bold mb-2 relative z-10 px-10">
          <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full group-hover/feature:bg-green-500 transition-all duration-200 origin-center" />
          <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block">
            {title}
          </span>
        </div>
        <p className="text-sm max-w-xs relative z-10 px-10 group-hover/feature:translate-x-2 transition duration-200">
          {description}
        </p>
      </div>
    );
  };