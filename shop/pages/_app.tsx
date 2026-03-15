import React from "react";
import type { AppProps } from "next/app";
// Some global styles but then afterward css module pattern instead
import "../src/styles/globals.scss";

const App = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default App;
