'use client'
import React from "react";
import styles from "./page.module.css";
// import ExampleComponent from "../example2/example2";
import TaskManager from "@/example2/example2";

export default function Home() {
  return (
    <div className={styles.page}>
      {/* Switch out this component with other example components */}
      <TaskManager initialTasks={[
  { id: 1, title: "Task 1", completed: false },
  { id: 2, title: "Task 2", completed: true },
]} />
    </div>
  );
}
