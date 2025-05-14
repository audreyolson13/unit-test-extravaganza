// This is my solution to testing example2.
// Remove the skip from the describe statement to run the tests.

import React from "react";
import { render, screen } from "@testing-library/react";
import TaskList from "./example5";
import useGetTasks, { Task } from "./useGetTasks";

jest.mock("./useGetTasks");

const defaultTasks: Task[] = [
  { id: 1, title: "Task 1", completed: false },
  { id: 2, title: "Task 2", completed: true },
];

describe.skip("<TaskList />", () => {
  beforeEach(() => {
    (useGetTasks as jest.Mock).mockReturnValue({
      data: { tasks: defaultTasks },
      loading: false,
      error: null,
    });
  });
  it("renders empty tasks", () => {
    (useGetTasks as jest.Mock).mockReturnValue({
      data: { tasks: [] },
      loading: false,
      error: null,
    });
    render(<TaskList />);
    expect(screen.getByText("Task List")).toBeInTheDocument();
  });
  it("renders tasks", () => {
    render(<TaskList />);
    expect(screen.getByText("Task List")).toBeInTheDocument();
    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();
    expect(screen.getByRole("checkbox", { name: "Task 1" })).not.toBeChecked();
    expect(screen.getByRole("checkbox", { name: "Task 2" })).toBeChecked();
  });
  it("renders loading", () => {
    (useGetTasks as jest.Mock).mockReturnValue({
      tasks: [],
      loading: true,
      error: null,
    });
    render(<TaskList />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
    expect(screen.queryByText("Task List")).not.toBeInTheDocument();
  });
  it("renders error", () => {
    (useGetTasks as jest.Mock).mockReturnValue({
      tasks: [],
      loading: false,
      error: new Error("Error"),
    });
    render(<TaskList />);
    expect(screen.getByText("Error: Error")).toBeInTheDocument();
    expect(screen.queryByText("Task List")).not.toBeInTheDocument();
  });
});
