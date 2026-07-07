import type { Metadata } from "next";
import { Manrope, DM_Sans, IBM_Plex_Mono } from "next/font/google";
import AuthProvider from "../components/AuthProvider";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "GymOrNot.com — The Brutal Honesty Diagnostic",
  description:
    "Answer four questions. Find out if you're a gym member or a monthly donor to a corporate gym chain that will never see you after January 19th.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${manrope.variable} ${dmSans.variable} ${plexMono.variable}`}>
      <body className="font-body bg-[#0A0A0A] text-[#F5F5F0] antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
