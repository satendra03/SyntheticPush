// src/app/components/testimonals.tsx
"use client";

import { Marquee } from "@/components/magicui/marquee";
import { ClientTweetCard } from "@/components/magicui/client-tweet-card";
import { testimonials } from "@/app/data/testimonials"; 

export function Testimonials() {

  const firstRow = testimonials.slice(0, 5);
  const secondRow = testimonials.slice(5, 10);

  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden my-5">
      <Marquee className="[--duration:60s]" pauseOnHover>
        {firstRow.map((testimonial, index) => (
          <ClientTweetCard key={index} id={testimonial.id} className="w-full max-w-md" />
        ))}
      </Marquee>
      <Marquee className="[--duration:60s]" pauseOnHover reverse>
        {secondRow.map((testimonial, index) => (
          <ClientTweetCard key={index} id={testimonial.id} className="w-full max-w-md" />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
    </div>
  );
};
