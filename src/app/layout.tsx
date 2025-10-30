import type React from "react";
import type { Metadata } from "next";
import { Poppins } from "next/font/google"; // Add Poppins
import "./globals.css";
import { AuthProvider } from "@/context/auth-context";
import Providers from "../providers/RQuery";

// Initialize Geist and Poppins fonts
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-poppins",
  display: "swap", // Prevents FOIT (Flash of Invisible Text)
});

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
      <body 
      className={`${poppins.variable} font-poppins`}>
        <Providers>
          <AuthProvider>{children}</AuthProvider>
        </Providers>
      </body>
    </html>
  );
}