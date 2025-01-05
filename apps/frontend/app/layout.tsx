import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import Navbar from "@/components/Navbar";
import TanstackProvider from "@/context/TanstackProvider";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Leads Management System",
  description: "Created by Imtiaz uddin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-neutral-100`}
      >
        <TanstackProvider>
          <>
            <Toaster />
            <Navbar />
            <div className="container mx-auto p-4 md:p-6 lg:p-8 xl:p-16 ">
              {children}
            </div>
          </>
        </TanstackProvider>
      </body>
    </html>
  );
}
