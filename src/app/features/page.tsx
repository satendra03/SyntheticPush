// src/app/features/page.tsx

import React from "react";

const Features = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Features</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            SyntheticPush is the ultimate tool for developers who want to have fun with their GitHub profile, test workflows, or just enjoy a little harmless mischief. Here’s what you get:
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 mb-16">
          <div className="bg-muted/50 rounded-lg p-6 flex flex-col gap-2">
            <h2 className="text-xl font-semibold flex items-center gap-2">GitHub Commits</h2>
            <p>Pick any date, and we’ll commit for you. Perfect for streaks, demos, or just for laughs.</p>
          </div>
          <div className="bg-muted/50 rounded-lg p-6 flex flex-col gap-2">
            <h2 className="text-xl font-semibold flex items-center gap-2">Clean UI</h2>
            <p>Minimal design, maximum sarcasm. Enjoy a smooth, distraction-free experience.</p>
          </div>
          <div className="bg-muted/50 rounded-lg p-6 flex flex-col gap-2">
            <h2 className="text-xl font-semibold flex items-center gap-2">Credit System</h2>
            <p>Earn or buy credits to use features. No hidden fees, no subscriptions, just simple credits.</p>
          </div>
          <div className="bg-muted/50 rounded-lg p-6 flex flex-col gap-2">
            <h2 className="text-xl font-semibold flex items-center gap-2">No Personal Data Needed</h2>
            <p>Just GitHub login, nothing else. We respect your privacy and keep things simple.</p>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">🛠️ Upcoming Features</h2>
          <ul className="list-disc list-inside space-y-2 ml-4 text-lg">
            <li>Bulk commit scheduling</li>
            <li>Commit analytics dashboard</li>
            <li>Date selection form GitHub Graph</li>
          </ul>
        </div>

        <div className="text-center mt-12">
          <h2 className="text-2xl font-bold mb-2">Ready to try SyntheticPush?</h2>
          <p className="mb-6 text-lg">Sign in with GitHub and start having fun with your commit history today!</p>
        </div>
      </div>
    </div>
  );
};

export default Features;