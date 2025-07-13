// app/not-found.tsx
"use client";

export default function NotFound() {
    return (
      <div className="text-center p-20">
        <h1 className="text-4xl font-bold text-red-600">404 - Page Not Found</h1>
        <p className="mt-4">The page you're looking for doesn't exist.</p>
      </div>
    );
  }