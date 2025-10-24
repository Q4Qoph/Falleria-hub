import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/auth-context";
import Providers from "../providers/RQuery";

const geistSans = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Falleria Hub International",
  description:
    "Expert guidance for international university admissions. We simplify the process and help you achieve your dreams of studying abroad.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.className}`}>
        <Providers>
          <AuthProvider>{children}</AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
