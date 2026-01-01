import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://zaftech.co";

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
  title: "ZafTech | Full-Service Web & Software Studio",
  description:
    "ZafTech builds conversion-focused websites, robust digital platforms, and reliable AI support assistants tailored to any business.",
  keywords: [
    "web development agency",
    "product design",
    "RAG chatbot",
    "customer support automation",
    "WordPress team",
    "full service studio",
    "digital platforms",
  ],
  openGraph: {
    title: "ZafTech — Full-Service Web & Software Studio",
    description:
      "Web and product experiences built end-to-end, plus RAG assistants for support, sales, and knowledge workflows.",
    url: siteUrl,
    siteName: "ZafTech",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ZafTech — Web, Product, and AI Support",
    description:
      "Web platforms, UX/UI, WordPress, and reliable RAG assistants for any business use case.",
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
