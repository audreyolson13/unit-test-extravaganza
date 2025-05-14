// This is my solution to testing example2.
// Remove the skip from the describe statement to run the tests.

import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TaskManager, { Task } from "./example2";

const defaultTasks: Task[] = [
  { id: 1, title: "Task 1", completed: false },
  { id: 2, title: "Task 2", completed: true },
];

describe.skip("<TaskManager />", () => {
  it("renders empty tasks", () => {
    render(<TaskManager initialTasks={[]} />);

    expect(
      screen.getByRole("heading", { name: /task manager/i })
    ).toBeInTheDocument();
    expect(screen.getByText("No tasks found.")).toBeInTheDocument();
  });
  it('filters tasks by all when "All" button is clicked', async () => {
    render(<TaskManager initialTasks={defaultTasks} />);

    await userEvent.click(screen.getByRole("button", { name: /all/i }));
    expect(
      screen.getByRole("checkbox", { name: /Task 1/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("checkbox", { name: /Task 2/i })
    ).toBeInTheDocument();
  });
  it('filters tasks by completed when "Completed" button is clicked', async () => {
    render(<TaskManager initialTasks={defaultTasks} />);

    await userEvent.click(screen.getByRole("button", { name: "Completed" })); //Note...you can use a string match or the regex match as seen in previous examples

    expect(
      screen.queryByRole("checkbox", { name: "Task 1" })
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("checkbox", { name: "Task 2" })
    ).toBeInTheDocument();
  });
  it('filters tasks by pending when "Pending" button is clicked', async () => {
    render(<TaskManager initialTasks={defaultTasks} />);

    await userEvent.click(screen.getByRole("button", { name: "Pending" }));

    expect(
      screen.getByRole("checkbox", { name: "Task 1" })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("checkbox", { name: "Task 2" })
    ).not.toBeInTheDocument();
  });
  it("toggles task completion", async () => {
    render(<TaskManager initialTasks={defaultTasks} />);

    expect(screen.getByLabelText("Task 1")).not.toBeChecked();

    await userEvent.click(screen.getByLabelText("Task 1"));

    expect(screen.getByLabelText("Task 1")).toBeChecked();
  });
  it("toggles task completion and updates filtered tasks", async () => {
    render(<TaskManager initialTasks={defaultTasks} />);

    expect(screen.getByLabelText("Task 1")).not.toBeChecked();
    expect(screen.getByLabelText("Task 2")).toBeChecked();

    await userEvent.click(screen.getByRole("button", { name: "Pending" }));

    expect(screen.getByLabelText("Task 1")).toBeInTheDocument();
    expect(screen.queryByLabelText("Task 2")).not.toBeInTheDocument();

    await userEvent.click(screen.getByLabelText("Task 1"));

    expect(screen.getByText("No tasks found.")).toBeInTheDocument();
  });
});
