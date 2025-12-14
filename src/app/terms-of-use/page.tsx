// src/app/terms-of-use/page.tsx

import React from "react";
import { FileSignature, ShieldAlert, Gavel, Info, Ban, Coins, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const TermsOfUse = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-muted rounded-full mb-6">
            <FileSignature className="w-8 h-8 text-foreground" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">Terms of Use</h1>
          <p className="text-lg text-muted-foreground">
            The rules of engagement. Please read carefully.
          </p>
          <p className="text-sm text-muted-foreground mt-4">
            Effective Date: Dec 15, 2025
          </p>
        </div>

        <div className="space-y-12">
          {/* Section 1: Overview */}
          <Section icon={<Info className="w-5 h-5" />} title="1. Service Overview">
            <p>
              SyntheticPush is a tool that allows users to simulate or automate Git commits on a selected date.
              That’s it — no development, no hosting, no data storage beyond what is necessary directly for the service.
            </p>
          </Section>

          {/* Section 2: User Responsibility */}
          <Section icon={<FileSignature className="w-5 h-5" />} title="2. User Responsibility">
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-2">
              <li>
                You understand that the commit is <strong className="text-foreground">synthetic</strong> and does not reflect actual code work.
              </li>
              <li>
                You are solely responsible for how you use the synthetic commit in your personal or professional profile.
              </li>
            </ul>
          </Section>

          {/* Section 3: Prohibited Uses */}
          <Section icon={<Ban className="w-5 h-5" />} title="3. Prohibited Uses">
            <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <ShieldAlert className="w-6 h-6 text-destructive flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-destructive mb-3">Do NOT:</h4>
                  <ul className="list-disc list-inside space-y-2 text-foreground/80">
                    <li>Misrepresent synthetic commits as genuine work for fraudulent purposes.</li>
                    <li>Use the service for illegal or harmful activities.</li>
                    <li>Attempt to reverse-engineer, scrape, or attack the platform.</li>
                  </ul>
                </div>
              </div>
            </div>
          </Section>

          {/* Section 4: Credit System */}
          <Section icon={<Coins className="w-5 h-5" />} title="4. Credit System">
            <p>
              SyntheticPush runs on a credit system. Credits can be purchased or earned.
              Credits are non-transferable and usage is final. We reserve the right to modify credit pricing or earnings at any time.
            </p>
          </Section>

          {/* Section 5: No Warranty */}
          <Section icon={<AlertTriangle className="w-5 h-5" />} title="5. No Warranty">
            <p className="mb-4">
              This service is provided on an <strong className="text-foreground">“as is”</strong> basis.
            </p>
            <div className="p-4 bg-muted/50 rounded-lg border text-muted-foreground">
              We make no guarantees regarding uptime, commit accuracy, or that the service will meet your specific requirements.
            </div>
          </Section>

          {/* Contact */}
          <div className="bg-muted/30 border rounded-2xl p-8 text-center mt-12">
            <h3 className="text-xl font-bold mb-4">Questions about the Terms?</h3>
            <Link href="mailto:satendrakumarparteti.work@gmail.com">
              <Button variant="outline" className="gap-2">
                <Gavel className="w-4 h-4" />
                Contact Legal Team
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

export default TermsOfUse;
