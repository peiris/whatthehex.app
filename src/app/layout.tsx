import type { Metadata } from "next";
import Script from "next/script";
import "remixicon/fonts/remixicon.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "WhatTheHex?! — Let's give your color a name?!",
  description:
    "WhatTheHex helps you with generating a unique color name, and CSS/SCSS variable names for your Hex color code!",
  openGraph: {
    type: "website",
    url: "https://whatthehex.app/",
    title: "WhatTheHex?! — Let's give your color a name?!",
    description:
      "WhatTheHex helps you with generating a unique color name, and CSS/SCSS variable names for your Hex color code!",
    images: ["https://whatthehex.app/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    site: "https://whatthehex.app/",
    title: "WhatTheHex?! — Let's give your color a name?!",
    description:
      "WhatTheHex helps you with generating a unique color name, and CSS/SCSS variable names for your Hex color code!",
    images: ["https://whatthehex.app/og-image.png"],
    creator: "@peiris__",
  },
  icons: {
    apple: "https://whatthehex.app/apple-touch-icon.png",
    icon: [
      {
        url: "https://whatthehex.app/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "https://whatthehex.app/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
    ],
  },
  manifest: "https://whatthehex.app/site.webmanifest",
  other: {
    "msapplication-TileColor": "#ffffff",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#ffffff" />
        <link
          rel="mask-icon"
          href="https://whatthehex.app/safari-pinned-tab.svg"
          color="#0d51ff"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body id="body" className="font-sans">
        {children}
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
          data-ad-client="ca-pub-8582836221927107"
          async
          strategy="afterInteractive"
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-EQY1JCDPK4"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-EQY1JCDPK4');
          `}
        </Script>
      </body>
    </html>
  );
}
