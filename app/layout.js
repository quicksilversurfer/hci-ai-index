import localFont from "next/font/local";
import clsx from "clsx";
import "@/app/globals.css";

import { Providers } from "@/app/providers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LayoutShell from "@/components/LayoutShell";

import { JetBrains_Mono, Public_Sans, Literata } from "next/font/google";

const bespoke = localFont({
  src: "../fonts/BespokeSans-Variable.ttf",
  display: "swap",
  variable: "--font-bespoke",
});
const supreme = localFont({
  src: "../fonts/supreme-variable.woff2",
  display: "swap",
  variable: "--font-supreme",
});
const sabon = localFont({
  src: "../fonts/Sabon.ttf",
  display: "swap",
  variable: "--font-sabon",
});
const jetbrains = JetBrains_Mono({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains",
});
const publicSans = Public_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-public-sans",
});
const literata = Literata({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-literata",
});

export const metadata = {
  metadataBase: new URL("https://hciindex.com/"),
  title: {
    default: "HCI Index - Weekly Synthesis of HCI Literature",
    template: "%s | HCI Index",
  },
  description:
    "Explore a curated weekly synthesis of HCI literature, designed to enhance understanding and spark curiosity in the field of Human-Computer Interaction.",
  keywords: [
    "HCI",
    "Human-Computer Interaction",
    "AI",
    "User Experience Design",
    "Interaction Design",
    "Accessibility",
    "Social Computing",
    "Human-AI Collaboration",
    "Speculative Design",
    "Ethics in Design",
  ],
  authors: [{ name: "Prateek Solanki", url: "https://prateeksolanki.com" }],
  creator: "Prateek Solanki",
  publisher: "HCI Index",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hciindex.com/",
    title: "HCI Index - Weekly Synthesis of HCI Literature",
    description:
      "Explore a curated weekly synthesis of HCI literature, designed to enhance understanding and spark curiosity in the field of Human-Computer Interaction.",
    siteName: "HCI Index",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "HCI Index",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HCI Index",
    description: "A tailored weekly synthesis of HCI literature.",
    images: ["/opengraph-image.png"],
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body
        className={clsx(
          "h-full w-full min-h-screen flex flex-col antialiased bg-base-paper dark:bg-base-950 mx-auto selection:bg-yellowColl dark:selection:bg-yellow-light font-sans text-body-base text-base-900 dark:text-base-100",
          bespoke.variable,
          jetbrains.variable,
          supreme.variable,
          sabon.variable,
          publicSans.variable,
          literata.variable
        )}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "HCI Index",
              url: "https://hciindex.com/",
              description: "A tailored weekly synthesis of HCI literature.",
              author: {
                "@type": "Person",
                name: "Prateek Solanki",
                url: "https://prateeksolanki.com",
              },
            }),
          }}
        />
        <Providers>
          <Header />
          <LayoutShell footer={<Footer />}>{children}</LayoutShell>
        </Providers>
      </body>
    </html >
  );
}
