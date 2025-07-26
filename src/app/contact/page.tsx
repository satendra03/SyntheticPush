import React from "react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <div className="prose prose-gray dark:prose-invert max-w-none text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-muted-foreground mb-6">
            Got a bug, idea, or want to confess your sins? We’d love to hear
            from you! Reach out and we’ll usually reply faster than your last
            commit.
          </p>
        </div>

        <div className="text-center bg-muted/50 rounded-lg p-8 flex flex-col gap-6 items-center">
          <div>
            <h2 className="text-xl font-semibold mb-2">Email</h2>
            <a
              href="mailto:satendrakumarparteti.work@gmail.com"
              className="link font-mono"
            >
              satendrakumarparteti.work@gmail.com
            </a>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">GitHub</h2>
            <a
              href="https://github.com/satendra03"
              target="_blank"
              rel="noopener noreferrer"
              className="link font-mono"
            >
              satendra03
            </a>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">LinkedIn</h2>
            <a
              href="https://www.linkedin.com/in/connect-satendra/"
              target="_blank"
              rel="noopener noreferrer"
              className="link font-mono"
            >
              connect-satendra
            </a>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Instagram</h2>
            <a
              href="https://instagram.com/_satendra_03"
              target="_blank"
              rel="noopener noreferrer"
              className="link font-mono"
            >
              @_satendra_03
            </a>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground">
            We usually reply within 24 hours. For urgent issues, please use
            email.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
