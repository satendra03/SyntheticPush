// src/app/components/problems.tsx
"use client";
import { problems } from "@/app/data";
import { Card } from "./card/card";

export const Problems = () => {
  return (
    <div className="card-container">
      {problems.map((problem, index) => (
        <Card key={index} data={problem} borderTop colorTop index={index} />
      ))}
    </div>
  );
};