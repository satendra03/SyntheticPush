import React from "react";

const RefundReturnPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <h1 className="text-3xl font-bold mb-8 text-center">Refund & Return Policy</h1>

          <div className="bg-muted/50 p-4 rounded-lg mb-8">
            <p className="text-sm text-muted-foreground">
              <strong>Effective Date:</strong> July 26, 2025
            </p>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. No Refund Policy</h2>
            <p className="mb-4">
              SyntheticPush operates on a strict no-refund policy. Once credits are:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
              <li>Purchased</li>
              <li>or, Earned</li>
            </ul>
            <p>
              they cannot be returned, refunded, or exchanged under any circumstance.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Digital Service Nature</h2>
            <p>
              All services are digital and instantaneous, making refunds technically unfeasible. 
              You acknowledge this when purchasing or using credits.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Contact</h2>
            <div className="bg-foreground/10 border border-primary/20 rounded-lg p-4">
              <p className="font-medium mb-2">For any such queries, contact us at:</p>
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
              This refund policy is effective as of the date listed above and may be updated at any time. 
              Continued use of the service constitutes acceptance of any changes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefundReturnPolicy;