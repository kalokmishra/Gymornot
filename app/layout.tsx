import type { Metadata } from "next";
import { Archivo_Narrow, DM_Sans, IBM_Plex_Mono } from "next/font/google";
import AuthProvider from "../components/AuthProvider";
import "./globals.css";

const archivoNarrow = Archivo_Narrow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
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
    <html lang="en" className={`${archivoNarrow.variable} ${dmSans.variable} ${plexMono.variable}`}>
      <body className="font-body bg-void text-ink antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
