import React from "react";
// Some global styles but then afterward css module pattern instead
import "../src/styles/globals.scss";

const App = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default App;
