// src/app/components/testimonials.tsx
"use client";

import Image from "next/image";
import { Marquee } from "@/components/magicui/marquee";
import { testimonials } from "@/app/data/testimonials";
import { TestimonialType } from "@/types";
import { Star, CheckCircle2, Flame, GitCommit } from "lucide-react";

const DeveloperReviewCard = ({ testimonial }: { testimonial: TestimonialType }) => {
  return (
    <div className="relative w-[360px] md:w-[420px] rounded-2xl border border-border/80 bg-card/70 backdrop-blur-xl p-5 hover:border-emerald-500/50 hover:bg-card/90 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-emerald-500/5 group flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div className="relative w-11 h-11 rounded-full overflow-hidden ring-2 ring-emerald-500/30 group-hover:ring-emerald-500 transition-all flex-shrink-0">
              <Image
                src={testimonial.avatar}
                alt={testimonial.name}
                fill
                className="object-cover"
                sizes="44px"
              />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h4 className="font-semibold text-sm text-foreground truncate group-hover:text-emerald-400 transition-colors">
                  {testimonial.name}
                </h4>
                {testimonial.verified && (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                )}
              </div>
              <p className="text-xs text-muted-foreground font-mono truncate">
                @{testimonial.username}
              </p>
            </div>
          </div>

          {testimonial.streak && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
              <Flame className="w-3 h-3 text-emerald-400 fill-emerald-400" />
              {testimonial.streak}
            </span>
          )}
        </div>

        {/* Role */}
        <p className="text-xs text-emerald-500/80 dark:text-emerald-400/80 font-medium mb-3">
          {testimonial.role}
        </p>

        {/* Review Text */}
        <p className="text-sm text-foreground/90 leading-relaxed line-clamp-3">
          &ldquo;{testimonial.text}&rdquo;
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 mt-4 border-t border-border/50 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          {Array.from({ length: testimonial.stars || 5 }).map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-emerald-400 text-emerald-400" />
          ))}
        </div>
        <div className="flex items-center gap-2 font-mono text-[11px]">
          <span className="flex items-center gap-1 text-emerald-400/90 bg-emerald-500/5 px-2 py-0.5 rounded">
            <GitCommit className="w-3 h-3" />
            {testimonial.tag}
          </span>
          <span>{testimonial.date}</span>
        </div>
      </div>
    </div>
  );
};

export function Testimonials() {
  const firstRow = testimonials.slice(0, 4);
  const secondRow = testimonials.slice(4, 8);

  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden my-8 py-4">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-48 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <Marquee className="[--duration:45s] py-2" pauseOnHover>
        {firstRow.map((testimonial) => (
          <div key={testimonial.id} className="mx-3">
            <DeveloperReviewCard testimonial={testimonial} />
          </div>
        ))}
      </Marquee>

      <Marquee className="[--duration:45s] py-2" pauseOnHover reverse>
        {secondRow.map((testimonial) => (
          <div key={testimonial.id} className="mx-3">
            <DeveloperReviewCard testimonial={testimonial} />
          </div>
        ))}
      </Marquee>

      {/* Side gradient fade masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-background to-transparent z-10"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-background to-transparent z-10"></div>
    </div>
  );
}

