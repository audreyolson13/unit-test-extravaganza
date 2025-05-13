import React from "react";
import styles from "./page.module.css";
import ExampleComponent from "../example1/example1";

export default function Home() {
  return (
    <div className={styles.page}>
      {/* Switch out this component with other example components */}
      <ExampleComponent users={[]} />
    </div>
  );
}
