import React from "react";
import Head from "next/head";
import dynamic from 'next/dynamic';
import Thing from '../src/components/Thing';

const RemoteApp = dynamic(
  () => {
    return window.checkout?.get("./app").then((factory) => factory());
  },
  { ssr: false }
);


const HomePage = () => {
  return (
    <>
      <Head>
        <title>Hello Shop Homepage | Lenny Peters</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Next Thing || Module Federation" />
      </Head>
      <h1>Hello Shop Homepage running on port 3002</h1>
      <Thing/>
      <RemoteApp/>
    </>
  );
};

export default HomePage;
