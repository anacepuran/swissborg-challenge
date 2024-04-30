import type { Metadata } from "next";
import { NextSeo } from "next-seo";
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
      <NextSeo
        title="BORG Token Metrics and Breakdown Page"
        description="Deep-dive into the statistics of BORG and the mechanics of the full SwissBorg Ecosystem."
        openGraph={{
          title: "BORG Token Metrics and Breakdown Page",
          description:
            "Deep-dive into the statistics of BORG and the mechanics of the full SwissBorg Ecosystem.",
          images: [
            {
              url: "https://anacepuran.github.io/public/shareable-url.png",
              width: 1200,
              height: 630,
              alt: "BORG Token Metrics and Breakdown Page Image",
            },
          ],
          url: "https://swissborg-challenge.vercel.app/",
          type: "website",
        }}
        twitter={{
          cardType: "summary_large_image",
        }}
      />
      <body className={inter.className} style={{ fontFamily: "TT Commons" }}>
        {children}
      </body>
    </html>
  );
}
