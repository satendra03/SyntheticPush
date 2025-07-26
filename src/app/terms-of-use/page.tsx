import React from "react";

const TermsOfUse = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <h1 className="text-3xl font-bold mb-8 text-center">Terms of Use</h1>

          <div className="bg-muted/50 p-4 rounded-lg mb-8">
            <p className="text-sm text-muted-foreground">
              <strong>Effective Date:</strong> July 26, 2025
            </p>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Service Overview</h2>
            <p>
              SyntheticPush is a tool that allows users to simulate or automate
              Git commits on a selected date. That’s it — no development, no
              hosting, no data storage beyond what is necessary for the service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              2. User Responsibility
            </h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                You understand that the commit is synthetic and does not reflect
                actual code work.
              </li>
              <li>
                You are solely responsible for how you use the synthetic commit
                in your personal or professional profile.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Prohibited Uses</h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                Misrepresent the nature of synthetic commits as genuine work.
              </li>
              <li>
                Use the service for fraudulent, illegal, or harmful purposes.
              </li>
              <li>
                Attempt to reverse-engineer, copy, or misuse the platform’s
                mechanisms.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Credit System</h2>
            <p>
              SyntheticPush runs on a credit system. Credits can be purchased or
              earned via testiminials. You are responsible for the usage of your
              credits.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. No Warranty</h2>
            <p>
              This service is provided on an “as is” basis. We make no
              guarantees regarding uptime, commit accuracy, or platform
              performance.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Data Usage</h2>
            <p>
              You acknowledge that SyntheticPush stores minimal user info
              (GitHub ID, credits, history) solely to deliver the commit
              service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Contact</h2>
            <div className="bg-foreground/10 border border-primary/20 rounded-lg p-4">
              <p className="font-medium mb-2">Questions or concerns?</p>
              <a
                href="mailto:satendrakumarparteti.work@gmail.com"
                className="link"
              >
                satendrakumarparteti.work@gmail.com
              </a>
            </div>
          </section>

          <div className="border-t pt-8 mt-12">
            <p className="text-sm text-muted-foreground text-center">
              These Terms of Use are effective as of the date listed above and
              may be updated at any time. Continued use of the service
              constitutes acceptance of any changes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUse;
