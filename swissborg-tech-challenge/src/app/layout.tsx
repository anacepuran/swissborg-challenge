import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./style/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BORG Token Metrics",
  description:
    "Deep-dive into the statistics of BORG and the mechanics of the full SwissBorg Ecosystem.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          property="og:title"
          content="BORG Token Metrics and Breakdown Page"
        />
        <meta
          property="og:description"
          content="Deep-dive into the statistics of BORG and the mechanics of the full SwissBorg Ecosystem."
        />
        <meta
          property="og:image"
          content="https://anacepuran.github.io/public/shareable-url.png"
        />
        <meta
          property="og:url"
          content="https://swissborg-challenge.vercel.app/"
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="BORG Token Metrics and Breakdown Page"
        />
        <meta
          name="twitter:description"
          content="Deep-dive into the statistics of BORG and the mechanics of the full SwissBorg Ecosystem."
        />
        <meta
          name="twitter:image"
          content="https://anacepuran.github.io/public/shareable-url.png"
        />
        <meta
          name="twitter:url"
          content="https://swissborg-challenge.vercel.app/"
        />
        <title>BORG Token Metrics</title>
      </head>
      <body className={inter.className} style={{ fontFamily: "TT Commons" }}>
        {children}
      </body>
    </html>
  );
}
