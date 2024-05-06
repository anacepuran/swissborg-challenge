import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <link rel="icon" type="image/x-icon" href="images/favicon.ico" />
      <link rel="preload" type="image/x-icon" href="icons/usd-to-borg.ico" />
      <link
        rel="preload"
        href="fonts/TT-Commons-Light.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"></link>
      <link
        rel="preload"
        href="fonts/TT-Commons-DemiBold.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"></link>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
