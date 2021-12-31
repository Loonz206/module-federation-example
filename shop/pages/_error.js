import React from "react";
import Head from "next/head";

const Error = ({ statusCode }) => {
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

Error.getInitialProps = ({ res, err }) => {
  if (res) {
    return res.statusCode;
  }
  return err ? err.statusCode : 404;
};

export default Error;
