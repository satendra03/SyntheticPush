"use client";

import React from "react";
import { Mail, Github, Linkedin, Instagram, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

const contacts = [
  {
    icon: Mail,
    label: "Email",
    value: "satendrakumarparteti.work@gmail.com",
    href: "mailto:satendrakumarparteti.work@gmail.com",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "satendra03",
    href: "https://github.com/satendra03",
    color: "text-gray-200",
    bg: "bg-white/5",
    border: "border-white/10",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "connect-satendra",
    href: "https://www.linkedin.com/in/connect-satendra/",
    color: "text-blue-600",
    bg: "bg-blue-600/10",
    border: "border-blue-600/20",
  },
  {
    icon: Instagram,
    label: "Instagram",
    value: "@_satendra_03",
    href: "https://instagram.com/_satendra_03",
    color: "text-pink-500",
    bg: "bg-pink-500/10",
    border: "border-pink-500/20",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const Contact = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col items-center justify-center p-4 sm:p-8">
      {/* Background Gradients */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-500/10 rounded-full blur-[128px] pointer-events-none" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-4xl w-full space-y-12 relative z-10"
      >
        {/* Header */}
        <motion.div variants={item} className="text-center space-y-6">
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/50">
            Get in Touch
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Got a bug, idea, or want to collaborate? We&apos;d love to hear from you.
            Reach out and we&apos;ll get back to you faster than your build time.
          </p>
        </motion.div>

        {/* Contact Grid */}
        <motion.div
          variants={item}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
        >
          {contacts.map((contact, idx) => (
            <a
              key={idx}
              href={contact.href}
              target={contact.icon === Mail ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="group"
            >
              <div className={`
                h-full p-6 sm:p-8 rounded-2xl
                bg-card/30 hover:bg-card/50 backdrop-blur-xl
                border border-white/5 hover:border-white/10
                transition-all duration-300 ease-out
                flex items-center gap-6
                hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/5
              `}>
                <div className={`p-4 rounded-xl ${contact.bg} ${contact.color} group-hover:scale-110 transition-transform duration-300`}>
                  <contact.icon className="w-6 h-6 sm:w-8 sm:h-8" />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg mb-1 group-hover:text-green-500 transition-colors">
                    {contact.label}
                  </h3>
                  <p className="text-muted-foreground font-mono text-sm sm:text-base truncate group-hover:text-foreground transition-colors">
                    {contact.value}
                  </p>
                </div>

                <ExternalLink className="w-5 h-5 text-muted-foreground/50 group-hover:text-foreground group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </div>
            </a>
          ))}
        </motion.div>

        {/* Footer Note */}
        <motion.div variants={item} className="text-center pt-8 border-t border-white/5">
          <p className="text-sm text-muted-foreground">
            We usually reply within 24 hours. For urgent matters, email is best.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Contact;
