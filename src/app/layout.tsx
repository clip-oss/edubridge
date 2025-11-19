import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "EduBridge - AI-Powered Study Abroad Consulting",
  description: "Get into your dream school abroad with AI-powered essay assistance, school matching, and visa guidance. Join 2,500+ students who achieved their goals.",
  keywords: ["study abroad", "college application", "AI essay", "visa help", "scholarship", "university"],
  openGraph: {
    title: "EduBridge - AI-Powered Study Abroad Consulting",
    description: "Get into your dream school abroad with AI-powered guidance",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
