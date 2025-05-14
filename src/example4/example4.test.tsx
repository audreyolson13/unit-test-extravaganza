//TODO:
// 1. Figure out the different use cases for the LoginForm component, and stub out the tests.
// 2. With the help of copilot, write the tests.
// 3. run tests, ensure they pass, and check coverage.
// 4. If coverage is not 100%, use the coverage report to figure out what use cases are missing and fill in tests.

//NOTE: try to aim for best practices
//        getByRole instead of getByTestId or getByText, etc.
//        use userEvent instead of fireEvent
//        practice using regex and string matches

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginForm from "./example4";

//Feel free to delete the two tests below, they are just shown to demonstrate the difference between fireEvent and userEvent
describe("<LoginForm>", () => {
  //This test demonstrates how fireEvent only calls the event handler once with the full value
  it("fireEvent does not simulate typing realistically", () => {
    const props = {
      email: "",
      password: "",
      message: "",
      setEmail: jest.fn(),
      setPassword: jest.fn(),
      setMessage: jest.fn(),
    };
    render(<LoginForm {...props} />);

    // Simulate typing into the email field
    const emailInput = screen.getByLabelText(/email/i);
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });

    expect(props.setEmail).toHaveBeenCalled();
    expect(props.setEmail).toHaveBeenCalledTimes(1);
    expect(props.setEmail).toHaveBeenCalledWith("test@example.com");
  });
  //This test demonstrates how userEvent simulates typing realistically, we can see that the setEmail function is called for each character typed.
  //This is a more realistic simulation of how a user would type into the input field.
  it("userEvent does simulate realistic typing", async () => {
    const props = {
      email: "",
      password: "",
      message: "",
      setEmail: jest.fn(),
      setPassword: jest.fn(),
      setMessage: jest.fn(),
    };
    render(<LoginForm {...props} />);

    // Simulate typing into the email and password fields
    await userEvent.type(screen.getByLabelText(/email/i), "test@example.com");

    expect(props.setEmail).toHaveBeenCalledTimes(16);
    expect(props.setEmail).toHaveBeenNthCalledWith(1, "t");
    expect(props.setEmail).toHaveBeenNthCalledWith(2, "e");
    expect(props.setEmail).toHaveBeenNthCalledWith(3, "s");
    expect(props.setEmail).toHaveBeenNthCalledWith(4, "t");
    expect(props.setEmail).toHaveBeenNthCalledWith(5, "@");
    expect(props.setEmail).toHaveBeenNthCalledWith(6, "e");
    expect(props.setEmail).toHaveBeenNthCalledWith(7, "x");
    expect(props.setEmail).toHaveBeenNthCalledWith(8, "a");
    expect(props.setEmail).toHaveBeenNthCalledWith(9, "m");
    expect(props.setEmail).toHaveBeenNthCalledWith(10, "p");
    expect(props.setEmail).toHaveBeenNthCalledWith(11, "l");
    expect(props.setEmail).toHaveBeenNthCalledWith(12, "e");
    expect(props.setEmail).toHaveBeenNthCalledWith(13, ".");
    expect(props.setEmail).toHaveBeenNthCalledWith(14, "c");
    expect(props.setEmail).toHaveBeenNthCalledWith(15, "o");
    expect(props.setEmail).toHaveBeenNthCalledWith(16, "m");
  });
});
