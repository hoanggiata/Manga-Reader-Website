import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import AuthProvider from "./context/AuthProvider";

const poppins = Poppins({ weight: ['400', '700'],
style: ['normal', 'italic'],
subsets: ['latin'],
display: 'swap' });

export const metadata: Metadata = {
  title: "AE MANGA",
  description: "Generated by NextJS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        {children}</body>
    </html>
  );
}
