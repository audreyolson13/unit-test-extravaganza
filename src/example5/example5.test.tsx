import React from "react";
import { render } from "@testing-library/react";
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
    (useGetTasks as jest.Mock).mockReturnValue({
      tasks: [
        { id: 1, title: "Task 1", completed: false },
        { id: 2, title: "Task 2", completed: true },
      ],
      loading: false,
      error: null,
    });
    render(<TaskList />);
  });
});
