import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider, Navbar, Footer, BottomFooter } from "@/app/components";

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
        <ThemeProvider>
          <Navbar />
          <main className="flex-1 pt-20 min-w-sm">
            <div>{children}</div>
          </main>
          <Footer />
          <BottomFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
