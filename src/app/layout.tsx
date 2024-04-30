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
      <body className={inter.className} style={{ fontFamily: "TT Commons" }}>
        {children}
      </body>
    </html>
  );
}
