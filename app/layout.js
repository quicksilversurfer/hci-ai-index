import localFont from "next/font/local";
import clsx from "clsx";
import "@/app/globals.css";

import { Providers } from "@/app/providers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { JetBrains_Mono } from "next/font/google";

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
const jetbrains = JetBrains_Mono({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains",
});

export const metadata = {
  title: "HCI Index - A Practitioner's Guide to HCI Literature",
  description:
    "Explore a curated guide to HCI literature, designed to enhance understanding and spark curiosity in the field of Human-Computer Interaction, made using AI.",
  creator: "Prateek Solanki",
  creatorUrl: "https://prateeksolanki.com",
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
  referrer: "origin-when-cross-origin",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body
        className={clsx(
          "h-full w-full min-h-screen flex flex-col antialiased bg-base-paper dark:bg-base-950 mx-auto selection:bg-yellowColl dark:selection:bg-yellow-light",
          bespoke.variable,
          jetbrains.variable,
          supreme.variable
        )}
      >
        <Providers>
          <Header />
          <div className="max-w-screen-2xl mx-auto w-full grow flex flex-col">
            {children} <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
