import type { Metadata } from "next";
import { Poppins, DM_Sans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { TRPCReactProvider } from "@/trpc/client";
import { Toaster } from "@/components/ui/sonner";

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
  weight: ["300"],
  variable: "--dm-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <TRPCReactProvider>
        <html lang="en">
          <body
            className={`${poppins.variable} ${dmSans.variable} antialiased`}
          >
            <Toaster />
            {children}
          </body>
        </html>
      </TRPCReactProvider>
    </ClerkProvider>
  );
}
