import React from "react";
import styles from "./App.module.scss";

const App = () => {
  return (
    <div>
      <h1 className={styles.error}>
        This came from <code>checkout as a remoteEntry</code>!!
      </h1>
      <em>Check the network to see it comethrough.</em>
    </div>
  );
};

export default App;
