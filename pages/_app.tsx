import "@/styles/globals.css";
import { DefaultSeo } from "next-seo";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo
        title="SwissBorg - BORG Token Metrics"
        description="Deep-dive into the statistics of BORG and the mechanics of the full SwissBorg Ecosystem."
        openGraph={{
          type: "website",
          locale: "en_IE",
          url: "https://swissborg-challenge.vercel.app",
          site_name: "SwissBorg - BORG Token Metrics",
          images: [
            {
              url: "https://swissborg-challenge.vercel.app/images/shareable-url.png",
              width: 1200,
              height: 630,
              alt: "BORG Token Metrics",
            },
          ],
        }}
        twitter={{
          handle: "@handle",
          site: "@site",
          cardType: "summary_large_image",
        }}
      />
      <meta name="twitter:title" content="SwissBorg - BORG Token Metrics" />
      <meta
        name="twitter:description"
        content="Deep-dive into the statistics of BORG and the mechanics of the full SwissBorg Ecosystem."
      />
      <meta
        name="twitter:image"
        content="https://swissborg-challenge.vercel.app/images/shareable-url.png"
      />
      <Component {...pageProps} />;
    </>
  );
}
