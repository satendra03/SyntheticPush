// src/app/pricing/page.tsx

import React from "react";
import {
  CreditCard,
  Check,
  Sparkles,
  HelpCircle,
  Coffee,
  QrCode,
  Mail
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Pricing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 overflow-hidden text-center">
        <div className="container mx-auto px-4 relative z-10">
          <Badge
            variant="secondary"
            className="mb-6 px-4 py-1 text-sm rounded-full backdrop-blur-sm border-foreground/10"
          >
            <Sparkles className="w-3 h-3 mr-2 text-foreground" />
            Simple & Transparent
          </Badge>

          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight bg-gradient-to-br from-foreground to-foreground/50 bg-clip-text text-transparent">
            Invest in Your Graph
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Get started for free. Earn or buy credits to unlock more commits.
            No subscriptions, no hidden fees.
          </p>
        </div>

        {/* Background blobs */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-green-500/5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl -z-10" />
      </section>

      {/* Pricing Cards */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Free Tier */}
            <PricingCard
              title="Starter"
              price="Free"
              description="Perfect for testing the waters."
              features={[
                "3 Free Credits on Signup",
                "Single Commit Mode",
                "Basic Support"
              ]}
              buttonText="Get Started"
              href="/"
              highlighted={false}
            />

            {/* Pro Tier (Credits) */}
            <PricingCard
              title="Graph Pro"
              price="Pay as you go"
              description="Flexible credits for your needs."
              features={[
                "1 Credit = 1 Commit",
                "Bulk Commit Options",
                "Priority Support",
                "No Expiry on Credits"
              ]}
              buttonText="Buy Credits"
              href="#payment-methods"
              highlighted={true}
            />
          </div>
        </div>
      </section>

      {/* How It Works & Payment */}
      <section id="payment-methods" className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12">

            {/* How Credits Work */}
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <HelpCircle className="w-6 h-6" />
                How Credits Work
              </h2>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <div className="mt-1 bg-muted p-1 rounded-full h-fit"><Check className="w-4 h-4" /></div>
                  <p className="text-muted-foreground"><strong className="text-foreground">1 Credit = 1 Commit</strong> on any date you choose.</p>
                </li>
                <li className="flex gap-3">
                  <div className="mt-1 bg-muted p-1 rounded-full h-fit"><Check className="w-4 h-4" /></div>
                  <p className="text-muted-foreground">Sign up receives <strong className="text-foreground">10 free credits</strong> instantly.</p>
                </li>
                <li className="flex gap-3">
                  <div className="mt-1 bg-muted p-1 rounded-full h-fit"><Check className="w-4 h-4" /></div>
                  <p className="text-muted-foreground">Credits never expire.</p>
                </li>
              </ul>
            </div>

            {/* Payment Methods */}
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <CreditCard className="w-6 h-6" />
                Payment Methods
              </h2>
              <div className="space-y-4">
                <div className="p-4 border rounded-xl bg-card hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <Coffee className="w-5 h-5" />
                    <span className="font-semibold">Buy Me a Coffee</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">Pay instantly using our Buy Me a Coffee page.</p>
                  <Link href="https://www.buymeacoffee.com/satendra03" target="_blank" className="text-sm font-semibold link">
                    Visit Page &rarr;
                  </Link>
                </div>

                <div className="p-4 border rounded-xl bg-card hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <QrCode className="w-5 h-5" />
                    <span className="font-semibold">UPI Payment</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">Send payment to: <code className="bg-muted px-1 py-0.5 rounded text-xs">satendrakumarparteti@oksbi</code></p>
                </div>

                <div className="p-4 border rounded-xl bg-card hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <Mail className="w-5 h-5" />
                    <span className="font-semibold">Manual Credit</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Email screenshot to <a href="mailto:satendrakumarparteti.work@gmail.com" className="link">satendrakumarparteti.work@gmail.com</a></p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-muted/20 border-t">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold mb-10 text-center">Frequently Asked Questions</h2>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Can I get a refund?</AccordionTrigger>
              <AccordionContent>
                All purchases are final. Please see our Refund Policy for details. Since this is a digital service, we cannot offer refunds once credits are added.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>Is there a subscription?</AccordionTrigger>
              <AccordionContent>
                No subscriptions! Pay only for what you use. We believe in a simple pay-as-you-go model.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>Can I earn free credits?</AccordionTrigger>
              <AccordionContent>
                Yes! You get 3 credits on signup. We also plan to introduce referral bonuses and social sharing rewards soon.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>How do I check my balance?</AccordionTrigger>
              <AccordionContent>
                Your credit balance is always visible on your dashboard once you log in.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </div>
  );
};

const PricingCard = ({
  title,
  price,
  description,
  features,
  buttonText,
  href,
  highlighted
}: {
  title: string,
  price: string,
  description: string,
  features: string[],
  buttonText: string,
  href: string,
  highlighted: boolean
}) => {
  return (
    <div className={`relative p-6 md:p-8 rounded-2xl border flex flex-col h-full transition-all duration-300 ${highlighted ? 'bg-background shadow-xl ring-2 ring-green-500 scale-105 z-10' : 'bg-card hover:shadow-lg hover:-translate-y-1'}`}>
      {highlighted && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-green-500 text-primary-foreground px-3 py-1 rounded-full text-xs font-bold shadow-sm">
          Most Popular
        </div>
      )}
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <div className="text-3xl font-black mb-2">{price}</div>
      <p className="text-muted-foreground text-sm mb-6">{description}</p>

      <div className="flex-grow">
        <ul className="space-y-3 mb-8">
          {features.map((feature, i) => (
            <li key={i} className="flex items-center gap-2 text-sm">
              <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <Link href={href} className="w-full">
        <Button
          className="w-full rounded-xl font-semibold bg-green-500 hover:bg-green-600 hover:scale-105 transition-all duration-300 active:scale-95 text-white"
          variant="default"
        >
          {buttonText}
        </Button>
      </Link>
    </div>
  )
}



export default Pricing;


