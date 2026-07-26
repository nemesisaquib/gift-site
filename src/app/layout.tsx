import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "GiftSite — India's #1 Online Gift Store",
    template: "%s | GiftSite",
  },
  description:
    "Send gifts online with same-day delivery across India. Order flowers, cakes, personalised gifts, plants & more. Express delivery in 60 min.",
  keywords: ["gifts online", "flowers delivery", "birthday cake", "same day delivery gifts", "personalised gifts india"],
  openGraph: {
    type: "website",
    siteName: "GiftSite",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body className="flex flex-col min-h-screen bg-[#fafafa]">
        <Providers>
          <Header />
          {/* pt accounts for sticky header height (top USP bar + main nav + mega-nav) */}
          <main className="flex-grow pt-[130px] lg:pt-[148px]">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
