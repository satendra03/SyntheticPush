import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <h1 className="text-3xl font-bold mb-8 text-center">Privacy Policy</h1>
          
          <div className="bg-muted/50 p-4 rounded-lg mb-8">
            <p className="text-sm text-muted-foreground">
              <strong>Effective Date:</strong> July 26, 2025<br />
              <strong>Last Updated:</strong> July 26, 2025
            </p>
          </div>

          <p className="text-lg mb-6">
            At SyntheticPush, we value your privacy and are committed to protecting your data. 
            This Privacy Policy describes what we collect, why, and how we handle it responsibly.
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              1. What We Collect
            </h2>
            <p className="mb-4">We collect minimal data needed to provide our service:</p>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">a. User Identity (GitHub OAuth)</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>id (GitHub user ID)</li>
                  <li>username</li>
                  <li>avatarUrl</li>
                  <li>profileUrl</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">b. User Activity</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>credits (number of credits available)</li>
                  <li>history array (actions like signup, push with type, value, and timestamp)</li>
                  <li>joinedAt (account creation time)</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                2. Why We Collect This Data
            </h2>
            <p className="mb-4">We collect only what&apos;s necessary to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
              <li>Identify and authenticate users (via GitHub)</li>
              <li>Manage credits and commits</li>
              <li>Display usage history</li>
              <li>Prevent abuse and fraud</li>
            </ul>
            
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
              <h4 className="font-semibold text-destructive mb-2">We do NOT:</h4>
              <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                <li>Sell your data</li>
                <li>Show ads</li>
                <li>Track you across sites</li>
                <li>Use data for profiling or marketing</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              3. Data Protection
            </h2>
            <p className="mb-4">We use industry-standard measures to protect your data:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Firestore Security Rules</li>
              <li>Data transmission over HTTPS</li>
            </ul>
          </section>

          {/* <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              4. Legal Compliance
            </h2>
            <p className="mb-4">We comply with:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Information Technology Act, 2000 (India)</li>
              <li>IT (Reasonable Security Practices & Sensitive Personal Data) Rules, 2011</li>
              <li>General Data Protection Regulation (GDPR) (EU)</li>
              <li>California Consumer Privacy Act (CCPA) (US)</li>
            </ul>
          </section> */}

          {/* <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              5. Children's Privacy
            </h2>
            <p>
              SyntheticPush is not intended for users under the age of 13. 
              We do not knowingly collect data from children.
            </p>
          </section> */}

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              4. Your Rights
            </h2>
            <p className="mb-4">
              Depending on your jurisdiction, you have the right to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
              <li>Access or export your data</li>
              <li>Request deletion of your account and data</li>
              <li>Ask how your data is stored or used</li>
            </ul>
            
            <div className="bg-foreground/10 border border-primary/20 rounded-lg p-4">
              <p className="font-medium mb-2">Contact us anytime:</p>
              <a 
                href="mailto:satendrakumarparteti.work@gmail.com" 
                className="link"
              >
                satendrakumarparteti.work@gmail.com
              </a>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                5. Third-Party Services
            </h2>
            <p className="mb-4">We use:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                <strong>GitHub OAuth</strong> (for login) - subject to GitHub&apos;s privacy policy
              </li>
              <li>
                <strong>Firebase</strong> - for secure storage
              </li>
            </ul>
            <p className="mt-4 text-sm text-muted-foreground">
              You are advised to review their privacy policies as well.
            </p>
          </section>

          <div className="border-t pt-8 mt-12">
            <p className="text-sm text-muted-foreground text-center">
              This privacy policy is effective as of the date listed above and will remain in effect 
              except with respect to any changes in its provisions in the future, which will be in 
              effect immediately after being posted on this page.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
