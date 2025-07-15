// src/app/components/solutions.tsx
"use client";

import { solutions } from "@/app/data";
import { Card } from "./card/card";

export const Solutions = () => {
  return (
    <div className="card-container">
      {solutions.map((solution, index) => (
        <Card key={index} data={solution} index={index} />
      ))}
    </div>
  );
};
