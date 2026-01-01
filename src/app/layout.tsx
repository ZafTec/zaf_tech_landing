import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ZafTech | AI-First Full-Stack Agency for Web & Software",
  description:
    "ZafTech builds production-grade AI, high-concurrency backends, and conversion-driven web experiences with extreme cost efficiency.",
  keywords: [
    "AI development agency",
    "RAG pipelines",
    "Next.js experts",
    "Bun runtime",
    "Tailwind CSS v4",
    "cloud cost optimization",
    "high performance APIs",
  ],
  openGraph: {
    title: "ZafTech — AI, Backends, and Web that Scale",
    description:
      "Full-stack engineering studio delivering custom LLM/RAG systems, resilient APIs, and SEO-smart web experiences.",
    url: "https://zaftech.com",
    siteName: "ZafTech",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ZafTech — AI-First Full-Stack Studio",
    description:
      "Production-grade AI, high-speed APIs, and conversion-focused web builds powered by Next.js 16 + Bun.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${grotesk.variable} bg-[var(--color-bg)] text-[var(--color-ink)] antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
