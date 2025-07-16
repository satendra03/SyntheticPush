import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider, Navbar, Footer, BottomFooter } from "@/app/components";
import { Analytics } from "@vercel/analytics/next";
import { SessionWrapper } from "@/app/providers/session-provider";

export const metadata: Metadata = {
  title: "SyntheticPush | Create your own commits on GitHub",
  description: "Create your own commits on GitHub",
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
            <main className="flex-1 pt-20 min-w-sm">
              <div>{children}</div>
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
