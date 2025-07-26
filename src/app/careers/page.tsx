import React from "react";

const Careers = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <h1 className="text-3xl font-bold mb-8 text-center">Careers at SyntheticPush</h1>

          <section className="mb-8">
            <div className="bg-muted/50 p-6 rounded-lg mb-6">
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                So... you&apos;re looking for a career?
              </h2>
              <p className="text-lg mb-4">
                And you&apos;re using SyntheticPush to fake GitHub commits?
              </p>
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                <h3 className="text-xl font-semibold text-destructive mb-2 flex items-center gap-2">
                  🤨 Bro...
                </h3>
                <p>
                  If you think fake commits will get you a job, let us save your time and your recruiter&apos;s.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              🧠 DSA Roadmap: The Real Career Push
            </h2>
            <p className="text-lg mb-6">
              No commit hacks. Just you, your brain, and LeetCode.
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  📍 Step 1: Master the Basics
                </h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Arrays & Strings</li>
                  <li>Hashmaps & Sets</li>
                  <li>Stack & Queue</li>
                  <li>Recursion & Backtracking</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  📍 Step 2: Dive into Core DSA
                </h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Linked List</li>
                  <li>Binary Search</li>
                  <li>Sliding Window</li>
                  <li>Prefix Sum</li>
                  <li>Two Pointers</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  📍 Step 3: Trees & Graphs
                </h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Binary Tree</li>
                  <li>BST</li>
                  <li>Graph BFS/DFS</li>
                  <li>Union Find</li>
                  <li>Topological Sort</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  📍 Step 4: Dynamic Programming
                </h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>1D, 2D DP</li>
                  <li>Subset Sum</li>
                  <li>Knapsack</li>
                  <li>LIS, LCS</li>
                  <li className="text-muted-foreground">(yes, the stuff you&apos;ve been avoiding)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  📍 Step 5: Practice Platforms
                </h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>LeetCode</li>
                  <li>Codeforces</li>
                  <li>AtCoder</li>
                  <li>GFG DSA Sheet</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                🎁 Bonus Tip:
              </h3>
              <p className="text-lg">
                Fake commits don&apos;t pass interviews.<br />
                But confidence + real skills do.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              😎 Still Want to Work With Us?
            </h2>
            <div className="bg-muted/50 p-6 rounded-lg">
              <p className="mb-4">Sure, here&apos;s your offer:</p>
              <div className="space-y-2">
                <p><strong>Position:</strong> Timepass Intern</p>
                <p><strong>Salary:</strong> ₹0/month + 5 free commits/month</p>
                <p><strong>Perks:</strong> Unlimited guilt and recruiter nightmares</p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <div className="bg-foreground/10 border border-primary/20 rounded-lg p-6 text-center">
              <h3 className="text-xl font-semibold mb-3 flex items-center gap-2 justify-center">
                👉 Now go, young warrior.
              </h3>
              <p className="text-lg">
                Push code, not lies.<br />
                And start your real career the right way.
              </p>
            </div>
          </section>

          <div className="border-t pt-8 mt-12">
            <p className="text-sm text-muted-foreground text-center">
              P.S. If you actually want to contribute to open source, we&apos;d love to hear from you at{' '}
              <a 
                href="mailto:satendrakumarparteti.work@gmail.com" 
                className="link"
              >
                satendrakumarparteti.work@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Careers;
