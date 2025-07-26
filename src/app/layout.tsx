import type { Metadata } from "next";
import { Poppins, DM_Sans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

export const metadata: Metadata = {
  title: "scrapper.ink",
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--poppins",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--dm-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${poppins.variable} ${dmSans.variable} antialiased`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
