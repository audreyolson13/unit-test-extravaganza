import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginForm from "./example4";

describe("<LoginForm>", () => {
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
