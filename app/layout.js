import localFont from "next/font/local";
import clsx from "clsx";
import "@/app/globals.css";

import { Providers } from "@/app/providers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { JetBrains_Mono } from "next/font/google";

const bespoke = localFont({
  src: "../fonts/bespokesans-variable.woff2",
  display: "swap",
  variable: "--font-bespoke",
});
const supreme = localFont({
  src: "../fonts/supreme-variable.woff2",
  display: "swap",
  variable: "--font-supreme",
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains",
});

export const metadata = {
  title: "hci index",
  description: "a practiotioner's guide to hci literature",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body
        className={clsx(
          "h-full w-full min-h-screen flex flex-col antialiased bg-base-paper dark:bg-base-950 max-w-screen-2xl mx-auto selection:bg-yellowColl dark:selection:bg-yellow-light ",
          bespoke.variable,
          jetbrains.variable,
          supreme.variable
        )}
      >
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
