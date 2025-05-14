//TODO:
// 1. Figure out the different use cases for the TaskList component, and stub out the tests.
// 2. With the help of copilot, write the tests.
// 3. run tests, ensure they pass, and check coverage.
// 4. If coverage is not 100%, use the coverage report to figure out what use cases are missing and fill in tests.

//NOTE: try to aim for best practices
//        getByRole instead of getByTestId or getByText, etc.
//        use userEvent instead of fireEvent
//        practice using regex and string matches

import React from "react";
import { render, screen } from "@testing-library/react";
import TaskList from "./example5";
import useGetTasks from "./useGetTasks";

// This mocks the useGetTasks module, allowing us to control its return value in our tests.
// This is useful for testing the TaskList component in isolation, without relying on the actual implementation of useGetTasks.
// By mocking this module, we can simulate different scenarios (like loading, error, or empty tasks) without needing to change the actual implementation of useGetTasks.
// This is a common practice in unit testing to isolate the component being tested and control its dependencies.
jest.mock("./useGetTasks");

describe("<TaskList />", () => {
  // This sets up the default return value for the mocked useGetTasks function.
  // This is run before each test in this describe block, ensuring that each test starts with a clean slate.
  // The mock return value is an object with tasks, loading, and error properties.
  // The tasks property is an empty array, simulating a scenario where there are no tasks to display.
  // The loading property is set to false, indicating that the data is not currently being loaded.
  // The error property is set to null, indicating that there are no errors.
  // This setup allows us to test the TaskList component in a controlled environment, simulating different scenarios as needed.
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
  it('renders loading', () => {
    // This is how we override the default return value of the mocked useGetTasks function for this specific test.
    // We set the tasks property to null, simulating a scenario where the data is still being loaded.
    // The loading property is set to true, indicating that the data is currently being loaded.
    // The error property is set to null, indicating that there are no errors.
    // This allows us to test how the TaskList component behaves when the data is still being loaded.
    (useGetTasks as jest.Mock).mockReturnValue({
      tasks: null,
      loading: true,
      error: null,
    });
    render(<TaskList />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
    expect(screen.queryByText("Task List")).not.toBeInTheDocument();
  })
});
