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
        <meta property="og:title" content={metadata.title?.toString()} />
        <meta
          property="og:description"
          content={metadata.description?.toString()}
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
        <meta name="twitter:title" content={metadata.title?.toString()} />
        <meta
          name="twitter:description"
          content={metadata.description?.toString()}
        />
        <meta
          name="twitter:image"
          content="https://anacepuran.github.io/public/shareable-url.png"
        />
        <meta
          name="twitter:url"
          content="https://swissborg-challenge.vercel.app/"
        />
      </head>
      <body className={inter.className} style={{ fontFamily: "TT Commons" }}>
        {children}
      </body>
    </html>
  );
}
