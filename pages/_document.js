import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Primary Meta Tags */}
        <meta
          name="description"
          content="WhatTheHex helps you with generating a unique color name, and CSS/SCSS variable names for your Hex color code!"
        />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://whatthehex.app/" />
        <meta
          property="og:title"
          content="WhatTheHex?! — Let's give your color a name?!"
        />
        <meta
          property="og:description"
          content="WhatTheHex helps you with generating a unique color name, and CSS/SCSS variable names for your Hex color code!"
        />
        <meta property="og:image" content="https://whatthehex.app/og-image.png" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://whatthehex.app/" />
        <meta
          property="twitter:title"
          content="WhatTheHex?! — Let's give your color a name?!"
        />
        <meta name="twitter:creator" content="@peiris__" />
        <meta
          property="twitter:description"
          content="WhatTheHex helps you with generating a unique color name, and CSS/SCSS variable names for your Hex color code!"
        />
        <meta
          property="twitter:image"
          content="https://whatthehex.app/og-image.png"
        />

        {/* Favicons */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/safari-pinned-tab.svg"
          color="#0d51ff"
        />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />

        {/* Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />

        {/* AdSense */}
        <script
          data-ad-client="ca-pub-8582836221927107"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
        />

        {/* Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-EQY1JCDPK4"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-EQY1JCDPK4');
            `,
          }}
        />
      </Head>
      <body id="body">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
