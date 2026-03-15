import React from "react";
import Head from "next/head";
import type { NextPageContext } from "next";

interface ErrorProps {
  statusCode?: number;
}

const Error = ({ statusCode }: ErrorProps) => {
  return (
    <>
      <Head>
        <title>
          {statusCode
            ? `An error ${statusCode} occurred on server`
            : "An error occurred on client"}
          | Lenny Peters
        </title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="500 Error | Lenny Peters" />
      </Head>
      <p>
        {statusCode
          ? `An error ${statusCode} occurred on server`
          : "An error occurred on client"}
      </p>
    </>
  );
};

Error.getInitialProps = ({ res, err }: NextPageContext): ErrorProps => {
  if (res) {
    return { statusCode: res.statusCode };
  }
  return { statusCode: err ? err.statusCode : 404 };
};

export default Error;
