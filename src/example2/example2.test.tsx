import React from "react";
import { render, screen } from "@testing-library/react";
import TaskManager from "./example2";

describe("<TaskManager />", () => {
  it("renders empty tasks", () => {
    render(<TaskManager initialTasks={[]} />);

    expect(screen.getByText("Task Manager")).toBeInTheDocument();
    expect(screen.getByText("No tasks found.")).toBeInTheDocument();
  });
});
