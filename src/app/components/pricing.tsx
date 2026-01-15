"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

export const Pricing = () => {
  return (
    <div className="flex justify-center flex-col items-center lg:flex-row h-full p-4 gap-4 lg:w-[70%] mx-auto">
      {/* Free Plan */}
      <div className="max-w-xs w-full">
        <div
          className={cn(
            "group w-full cursor-pointer overflow-hidden relative card h-96 rounded-md shadow-xl mx-auto flex flex-col justify-end p-4 border border-transparent dark:border-neutral-800",
            "shadow-2xl shadow-black/50"
          )}
        >
          <Image
            src="https://images.unsplash.com/photo-1645091246457-db3ae1e426d9?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Free Plan"
            fill
            className="object-cover -z-20"
          />
          <Image
            src="/free.gif"
            alt="Free Plan Gif"
            fill
            className="object-cover -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 pointer-events-none" />

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
            "group w-full cursor-pointer overflow-hidden relative card h-96 rounded-md shadow-xl mx-auto flex flex-col justify-end p-4 border border-transparent dark:border-neutral-800",
            "shadow-2xl shadow-black/50"
          )}
        >
          <Image
            src="https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Pro Plan"
            fill
            className="object-cover -z-20"
          />
          <Image
            src="/pro.gif"
            alt="Pro Plan Gif"
            fill
            className="object-cover -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 pointer-events-none" />

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
