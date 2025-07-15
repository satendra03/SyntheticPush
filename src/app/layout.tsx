import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider, Navbar, Footer, BottomFooter } from "@/app/components";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SyntheticPush | Create you own commits on GitHub",
  description: "Create you own commits on GitHub",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen w-full`}
      >
        <ThemeProvider>
          <Navbar />
          <main className="flex-1 pt-20 min-w-sm">
            <div className="">
              {children}
            </div>
          </main>
          <Footer />
          <BottomFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
