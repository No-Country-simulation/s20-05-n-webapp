import type { Metadata } from "next";

import "./globals.css";
import Navbar from "@/components/mainLayout/Navbar";
import Footer from "@/components/mainLayout/Footer";

export const metadata: Metadata = {
  title: "Stockify",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` antialiased min-h-screen flex flex-col `}>
        <Navbar />
        <main className="flex-grow flex flex-col min-h-0 ">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
