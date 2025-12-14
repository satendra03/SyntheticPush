// src/app/refund-return-policy/page.tsx

import React from "react";
import { CircleDollarSign, AlertCircle, Mail, HelpCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const RefundReturnPolicy = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-muted rounded-full mb-6">
            <CircleDollarSign className="w-8 h-8 text-foreground" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">Refund & Return Policy</h1>
          <p className="text-lg text-muted-foreground">
            Simple and transparent.
          </p>
          <p className="text-sm text-muted-foreground mt-4">
            Effective Date: Dec 15, 2025
          </p>
        </div>

        <div className="space-y-12">

          {/* Section 1: Strict No Refund */}
          <Section icon={<AlertCircle className="w-5 h-5" />} title="1. Strict No Refund Policy">
            <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-6">
              <p className="font-medium text-destructive">
                Once credits are purchased or earned, they cannot be returned, refunded, or exchanged under any circumstance.
              </p>
            </div>
          </Section>

          {/* Section 2: Why */}
          <Section icon={<HelpCircle className="w-5 h-5" />} title="2. Why no refunds?">
            <p>
              SyntheticPush provides digital, instantaneous services. When you buy credits, they are immediately available for use.
              Due to the nature of digital goods, we cannot &quot;take back&quot; the credits once they are issued.
              By purchasing, you acknowledge this policy.
            </p>
          </Section>

          {/* Contact */}
          <div className="bg-muted/30 border rounded-2xl p-8 text-center mt-12">
            <h3 className="text-xl font-bold mb-4">Have an issue with your purchase?</h3>
            <p className="text-muted-foreground mb-6">
              If you were charged but didn&apos;t receive credits, please contact us immediately.
            </p>
            <Link href="mailto:satendrakumarparteti.work@gmail.com">
              <Button variant="outline" className="gap-2">
                <Mail className="w-4 h-4" />
                Contact Support
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

export default RefundReturnPolicy;