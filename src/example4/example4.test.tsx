import React from "react";
import { render } from "@testing-library/react";
import TaskList from "./example4";
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
  });
});
