import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <link rel="icon" type="image/x-icon" href="images/favicon.ico" />
      <link rel="icon" type="image/x-icon" href="public/images/favicon.ico" />
      <link rel="icon" type="image/svg+xml" href="public/images/favicon.ico" />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
