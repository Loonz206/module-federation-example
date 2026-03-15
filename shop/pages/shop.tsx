import React from "react";
import Head from "next/head";
import type { NextPage } from "next";

const Shop: NextPage = () => {
  return (
    <>
      <Head>
        <title>Shop | Lenny Peters</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Shop || Module Federation" />
      </Head>
      <div>
        <h1>Shop page</h1>
        <h3>This is a federated page owned by localhost:3002</h3>
      </div>
    </>
  );
};

export default Shop;
