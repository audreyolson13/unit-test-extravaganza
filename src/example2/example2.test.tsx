//TODO:
// 1. Figure out the different use cases for the TaskManager component, and stub out the tests.
// 2. With the help of copilot, write the tests.
// 3. run tests, ensure they pass, and check coverage.
// 4. If coverage is not 100%, use the coverage report to figure out what use cases are missing and fill in tests.

//NOTE: try to aim for best practices 
//        getByRole instead of getByTestId or getByText, etc.
//        use userEvent instead of fireEvent
//        practice using regex and string matches

import React from "react";
import { render, screen } from "@testing-library/react";
import TaskManager from "./example2";

describe("<TaskManager />", () => {
  it("renders empty tasks", () => {
    render(<TaskManager initialTasks={[]} />);

    expect(
      screen.getByRole("heading", { name: /task manager/i })
    ).toBeInTheDocument();
    expect(screen.getByText("No tasks found.")).toBeInTheDocument();
  });
  //example of stubbed out test:
  it('filters tasks by all when "All" button is clicked', () => {});
});
