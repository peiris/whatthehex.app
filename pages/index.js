import Head from "next/head";
import Home from "components/home/home";
import Navigation from "components/navigation/navigation";
import Sidebar from "components/sidebar/sidebar";

export default function Index() {
  return (
    <>
      <Head>
        <title>WhatTheHex?! — Let&apos;s give your color a name?!</title>
        <meta name="viewport" content="width=device-width, user-scalable=no" />
      </Head>
      <Navigation />
      <Home />
      <Sidebar />
    </>
  );
}
