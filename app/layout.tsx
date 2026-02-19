import type { Metadata } from "next";
import { Inter, Playfair_Display } from 'next/font/google'
import { Footer } from "@/components/layout/Footer";
import { SiteHeader } from "@/components/layout/SiteHeader";
import "./globals.css";

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

export const metadata: Metadata = {
  title: 'StyleFusion',
  description: 'Hyper-personalized Luxury Fashion',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} bg-luxury-charcoal text-white font-sans`}>
        <SiteHeader />
        <div className="pt-24 min-h-screen">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
