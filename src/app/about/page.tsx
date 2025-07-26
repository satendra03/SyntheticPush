// src/app/about/page.tsx

import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <div className="prose prose-gray dark:prose-invert max-w-none text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">About SyntheticPush</h1>
          <p className="text-lg text-muted-foreground mb-6">
            SyntheticPush was built for developers who want to keep their GitHub graph green, or just have a little fun with their commit history. <br /> We&apos;re not here to judge. We&apos;re just here to commit, so you don&apos;t have to.
          </p>
        </div>

        <div className="bg-muted/50 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-semibold mb-4">Why SyntheticPush?</h2>
          <ul className="list-disc list-inside space-y-2 ml-4 text-lg">
            <li>Missed a day? We&apos;ve got your back.</li>
            <li>Forgot to commit? No worries.</li>
            <li>Want a perfect green contribution graph? Go for it.</li>
            <li>Just want to prank your friends? We won&apos;t tell.</li>
          </ul>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Our Philosophy</h2>
          <p className="text-lg">
              We believe in fun, transparency, and giving developers a little more control (and a little less guilt) over their commit history. Whether you&apos;re a perfectionist, a procrastinator, or just curious, SyntheticPush is here for you.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;