import React from 'react';
import Head from 'next/head';

const Checkout = (props) => {
  return (
    <>
      <Head>
        <title>checkout</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <div>
        <h1>checkout page</h1>
        <h3>
          This is a federated page owned by localhost:3000
        </h3>
        <span>Data from federated <pre>getInitialProps</pre></span>
        <br/>
        <pre>{JSON.stringify(props, null, 2)}</pre>
      </div>
    </>
  )
}

Checkout.getInitialProps = async () => {
  await fetch("https://jsonplaceholder.typicode.com/todos/1").then((res) =>
  res.json()
);
}

export default Checkout;
