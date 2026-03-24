import type { Metadata } from "next";
import { Quicksand, Caveat } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MatchPet",
  description: "Trouvez votre compagnon idéal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${quicksand.variable} ${caveat.variable} h-full antialiased`}>
      <body className="min-h-[100dvh] font-sans bg-bg-light flex flex-col w-full text-text-dark overflow-x-hidden">
        <Header />
        <main className="flex-1 flex flex-col w-full relative z-0">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
