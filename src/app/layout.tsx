import type { Metadata } from "next";
import "./globals.css";
import {
  ThemeProvider,
  Navbar,
  Footer,
  BottomFooter,
  SwitchTheme,
} from "@/app/components";
import { Analytics } from "@vercel/analytics/next";
import { SessionWrapper } from "@/app/providers/session-provider";
import { Toaster } from "@/components/ui/sonner"

export const metadata: Metadata = {
  metadataBase: new URL("https://synthetic-push.vercel.app"),
  title: {
    default: "SyntheticPush | Create your own commits on GitHub",
    template: "%s | SyntheticPush",
  },
  description:
    "Create your own commits on GitHub. SyntheticPush helps developers simulate and visualize GitHub commit activity for learning, testing, and demo purposes. Understand contribution graphs and manage repositories responsibly.",
  keywords: [
    "GitHub commits",
    "contribution graph",
    "developer productivity tools",
    "git history",
    "git commit simulation",
    "backdate commits",
    "developer tools",
    "git automation",
    "synthetic push",
  ],
  authors: [{ name: "Satendra Kumar Parteti" }],
  creator: "Satendra Kumar Parteti",
  category: "Developer Tools",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://synthetic-push.vercel.app",
    title: "SyntheticPush | Create your own commits on GitHub",
    description:
      "Create your own commits on GitHub. Boost your contribution graph, backdate commits, and manage your GitHub presence.",
    siteName: "SyntheticPush",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SyntheticPush - Create your own commits on GitHub",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SyntheticPush | Create your own commits on GitHub",
    description:
      "Create your own commits on GitHub. Boost your contribution graph, backdate commits, and manage your GitHub presence.",
    images: ["/twitter-image.png"],
    creator: "@_satendra_03",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased flex flex-col min-h-screen w-full">
        <SessionWrapper>
          <ThemeProvider>
            <Navbar />
            <main className="flex-1 pt-20 min-w-sm relative">
              <div>{children}</div>
              <div className="fixed z-50 bottom-10 right-5">
                <SwitchTheme />
                <Toaster />
              </div>
              <Analytics />
            </main>
            <Footer />
            <BottomFooter />
          </ThemeProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
