import "@/styles/globals.css";
import { DefaultSeo } from "next-seo";
import type { AppProps } from "next/app";

const TITLE = "SwissBorg - BORG Token Metrics";
const DESCRIPTION =
  "Deep-dive into the statistics of BORG and the mechanics of the full SwissBorg Ecosystem.";
const SITE_URL = "https://swissborg-challenge.vercel.app";
const IMAGE_URL =
  "https://swissborg-challenge.vercel.app/images/shareable-url.png";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <title>BORG Token Metrics</title>
      <DefaultSeo
        title={TITLE}
        description={DESCRIPTION}
        openGraph={{
          type: "website",
          locale: "en_IE",
          url: SITE_URL,
          site_name: TITLE,
          images: [
            {
              url: IMAGE_URL,
              width: 1200,
              height: 630,
              alt: TITLE,
            },
          ],
        }}
        twitter={{
          handle: "@handle",
          site: "@site",
          cardType: "summary_large_image",
        }}
      />
      {/* <meta name="twitter:title" content={TITLE} />
      <meta name="twitter:description" content={DESCRIPTION} /> */}
      <meta property="twitter:image" content={IMAGE_URL} />
      <meta property="twitter:image:width" content="1200" />
      <meta property="twitter:image:height" content="630" />
      <main>
        <Component {...pageProps} />
      </main>
    </>
  );
}
