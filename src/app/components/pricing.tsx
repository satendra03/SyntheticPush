// src/app/components/pricing.tsx
"use client";

import { cn } from "@/lib/utils";

export const Pricing = () => {
  return (
    <div className="flex justify-center flex-col items-center lg:flex-row h-full p-4 gap-4 lg:w-[70%] mx-auto">
      {/* Free Plan */}
      <div className="max-w-xs w-full">
        <div
          className={cn(
              "shadow-2xl shadow-black/50",
            "group w-full cursor-pointer overflow-hidden relative card h-96 rounded-md shadow-xl mx-auto flex flex-col justify-end p-4 border border-transparent dark:border-neutral-800",
            "bg-[url(https://images.unsplash.com/photo-1645091246457-db3ae1e426d9?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover",
            // Preload hover image by setting it in a pseudo-element
            `before:bg-[url('/free.gif')] before:fixed before:inset-0 before:opacity-0 before:z-[-1]`,
            `hover:bg-[url('/free.gif')]`,
            "hover:after:content-[''] hover:after:absolute hover:after:inset-0 hover:after:bg-black hover:after:opacity-50",
            "transition-all duration-500"
          )}
        >
          <div className="text relative z-50">
            <h1 className="font-bold text-xl md:text-3xl text-gray-50 relative">
              Free
            </h1>
            <p className="font-normal text-base text-gray-50 relative my-4">
              Just vibes. No card!
            </p>
            <ul className="list-disc list-inside text-gray-50 relative my-4"> 
              <li className="text-gray-50 relative my-4">
                Just Signup and get 3 Credits
              </li>
              <li className="text-gray-50 relative my-4">
                Tweet About Us get more!
              </li>
              <li className="text-gray-50 relative my-4">
                Try Pro plan too!!
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Pro Plan */}
      <div className="max-w-xs w-full">
        <div
          className={cn(
              "shadow-2xl shadow-black/50",
            "group w-full cursor-pointer overflow-hidden relative card h-96 rounded-md shadow-xl mx-auto flex flex-col justify-end p-4 border border-transparent dark:border-neutral-800",
            "bg-[url(https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover",
            // Preload hover image by setting it in a pseudo-element
            `before:bg-[url('/pro.gif')] before:fixed before:inset-0 before:opacity-0 before:z-[-1]`,
            `hover:bg-[url('/pro.gif')]`,
            "hover:after:content-[''] hover:after:absolute hover:after:inset-0 hover:after:bg-black hover:after:opacity-50",
            "transition-all duration-500"
          )}
        >
          <div className="text relative z-50">
            <h1 className="font-bold text-xl md:text-3xl text-gray-50 relative">
              Pro
            </h1>
            <p className="font-normal text-base text-gray-50 relative my-4">
              More power, fewer limitations.
            </p>
            <ul className="list-disc list-inside text-gray-50 relative my-4"> 
              <li className="text-gray-50 relative my-4">
                Credit amount is the paid amount
              </li>
              <li className="text-gray-50 relative my-4">
                No limit
              </li>
              <li className="text-gray-50 relative my-4">
                Can target a full Year
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
