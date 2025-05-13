import React from "react";
import { render, screen } from "@testing-library/react";
import TaskList from "./example5";
import useGetTasks from "./useGetTasks";

jest.mock("./useGetTasks");

describe("<TaskList />", () => {
  beforeEach(() => {
    (useGetTasks as jest.Mock).mockReturnValue({
      tasks: [],
      loading: false,
      error: null,
    });
  });
  it("renders empty tasks", () => {
    render(<TaskList />);
    expect(screen.getByText("Task List")).toBeInTheDocument();
  });
});
