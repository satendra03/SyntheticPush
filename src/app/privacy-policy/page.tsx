// src/app/privacy-policy/page.tsx

import React from "react";
import { Shield, Lock, Eye, FileText, Mail } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-muted rounded-full mb-6">
            <Shield className="w-8 h-8 text-foreground" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">Privacy Policy</h1>
          <p className="text-lg text-muted-foreground">
            We value your trust. Here is exactly what we do with your data.
          </p>
          <p className="text-sm text-muted-foreground mt-4">
            Last Updated: Dec 15, 2025
          </p>
        </div>

        <div className="space-y-12">
          {/* Section 1: What We Collect */}
          <Section icon={<Eye className="w-5 h-5 " />} title="1. What We Collect">
            <p className="mb-4">We collect minimal data needed to provide our service:</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-card border p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-semibold mb-2 text-foreground">User Identity</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm">
                  <li>GitHub User ID</li>
                  <li>Username</li>
                  <li>Avatar URL</li>
                  <li>Profile URL</li>
                </ul>
              </div>
              <div className="bg-card border p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-semibold mb-2 text-foreground">User Activity</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm">
                  <li>Available Credits</li>
                  <li>Commit History (Type, Value, Timestamp)</li>
                  <li>Account Creation Date</li>
                </ul>
              </div>
            </div>
          </Section>

          {/* Section 2: Why We Collect */}
          <Section icon={<FileText className="w-5 h-5" />} title="2. Why We Collect Data">
            <p className="mb-4">We collect only what&apos;s necessary to:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-2 mb-6">
              <li>Authenticate you via GitHub.</li>
              <li>Manage your credits and commit streaks.</li>
              <li>Display your usage history.</li>
              <li>Prevent abuse and fraud.</li>
            </ul>
            <div className="bg-destructive/5 border-l-4 border-destructive p-4 rounded-r-lg">
              <h4 className="font-bold text-destructive mb-2">What we DO NOT do:</h4>
              <ul className="list-disc list-inside space-y-1 text-foreground/80">
                <li>Sell your data</li>
                <li>Show ads</li>
                <li>Track you across other sites</li>
              </ul>
            </div>
          </Section>

          {/* Section 3: Data Protection */}
          <Section icon={<Lock className="w-5 h-5" />} title="3. Data Protection">
            <p className="mb-4">
              We use industry-standard measures to protect your data, including Firestore Security Rules and HTTPS encryption for all data transmission.
            </p>
          </Section>

          {/* Contact */}
          <div className="bg-muted/30 border rounded-2xl p-8 text-center">
            <h3 className="text-xl font-bold mb-4">Have questions about your data?</h3>
            <Link href="mailto:satendrakumarparteti.work@gmail.com">
              <Button variant="outline" className="gap-2">
                <Mail className="w-4 h-4" />
                Contact Privacy Team
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const Section = ({ icon, title, children }: { icon: React.ReactNode, title: string, children: React.ReactNode }) => {
  return (
    <section className="bg-background">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-3 pb-2 border-b">
        <div className="p-2 bg-muted rounded-md">{icon}</div>
        {title}
      </h2>
      <div className="text-muted-foreground leading-relaxed">
        {children}
      </div>
    </section>
  )
}

export default PrivacyPolicy;
