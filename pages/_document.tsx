import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script type="module" src="/modern-bundle.js" async />
        <script noModule src="/legacy-bundle.js" async />
      </Head>
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
