import React from "react";
import Head from "next/head";
import App from "../src/components/App";

const HomePage = () => {
  return (
    <>
      <Head>
        <title>Checkout HomePage | Lenny Peters</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Other Thing || Module Federation" />
        <h1>Hello Checkout Homepage running on port 3000</h1>
        <App />
      </Head>
    </>
  );
};

export default HomePage;
