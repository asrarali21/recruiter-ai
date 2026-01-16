import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from './providers'

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Recruiter AI | AI-Powered Hiring Automation",
  description: "Streamline your hiring process with AI-powered job description generation, intelligent resume analysis, and smart candidate matching. Built for modern recruiting teams.",
  keywords: ["hiring", "recruitment", "AI", "automation", "job posting", "resume screening", "candidate matching"],
  authors: [{ name: "Mohammed Asrar Ali" }],
  openGraph: {
    title: "Recruiter AI | AI-Powered Hiring Automation",
    description: "Streamline your hiring process with AI-powered automation",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
