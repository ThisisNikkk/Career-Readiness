import type { Metadata } from "next";
import { Outfit, Geist_Mono } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://readiness.titagray.com"),
  title: "Career Readiness Assessment",
  description: "Are you naturally coasting, climbing, or ready to leap? Answer 15 questions to uncover your Career Readiness profile and get a personal action plan.",
  openGraph: {
    title: "Career Readiness Assessment",
    description: "Are you naturally coasting, climbing, or ready to leap? Answer 15 questions to uncover your Career Readiness profile and get a personal action plan.",
    url: "https://readiness.titagray.com",
    siteName: "Tita Gray Consulting",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Career Readiness Assessment",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Career Readiness Assessment",
    description: "Find out how ready you are for your next career move in 3 minutes.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

import { CartProvider } from "./context/CartContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans overflow-x-hidden">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
