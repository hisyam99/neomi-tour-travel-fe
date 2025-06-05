import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Neomi Tour and Travel",
  description: "Discover New World with Neomi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
