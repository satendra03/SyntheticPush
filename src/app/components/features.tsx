// src/app/components/features.tsx
"use client";

import { features } from "@/app/data";
import { Card } from "./card/card";

export const Features = () => {
  
  return (
    <div className="card-container">
      {features.map((feature, index) => (
        <Card key={index} data={feature} borderBottom colorBottom index={index} />
      ))}
    </div>
  );
};

