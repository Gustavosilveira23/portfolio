import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gustavo Silveira — UX Designer & Product Builder",
  description:
    "Portfolio de UX Design, UX Research e Product Building. Do research ao deploy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="dark scroll-smooth bg-background">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
