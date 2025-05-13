import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginForm from "./example4";

const defaultProps = {
  email: "",
  setEmail: jest.fn(),
  password: "",
  setPassword: jest.fn(),
};

describe.skip("<LoginForm>", () => {
  it("calls setEmail on input change", async () => {
    const setEmail = jest.fn();
    render(<LoginForm {...defaultProps} setEmail={setEmail} />);
    await userEvent.type(
      screen.getByRole("textbox", { name: /email/i }),
      "test"
    );
    expect(setEmail).toHaveBeenCalledTimes(4);
  });
  it("calls setPassword on input change", async () => {
    const setPassword = jest.fn();
    render(<LoginForm {...defaultProps} setPassword={setPassword} />);
    await userEvent.type(screen.getByLabelText(/password/i), "test");
    expect(setPassword).toHaveBeenCalledTimes(4);
  });
  it("sets email and password values to initial values", () => {
    render(
      <LoginForm {...defaultProps} email="test@email.com" password="password" />
    );
    expect(screen.getByRole("textbox", { name: /email/i })).toHaveValue(
      "test@email.com"
    );
    expect(screen.getByLabelText(/password/i)).toHaveValue("password");
  });
  it("sets message on successful login", async () => {
    render(
      <LoginForm
        {...defaultProps}
        email="test@example.com"
        password="password123"
      />
    );
    await userEvent.click(screen.getByRole("button", { name: /login/i }));
    expect(screen.getByText(/login successful!/i)).toBeInTheDocument();
  });
  it("sets message on failed login", async () => {
    render(<LoginForm {...defaultProps} />);
    await userEvent.click(screen.getByRole("button", { name: /login/i }));
    expect(screen.getByText(/invalid email or password/i)).toBeInTheDocument();
  });
  it("sets message on failed login with correct email but wrong password", async () => {
    render(
      <LoginForm
        {...defaultProps}
        email="test@example.com"
        password="wrongpassword"
      />
    );
    await userEvent.click(screen.getByRole("button", { name: /login/i }));
    expect(screen.getByText(/invalid email or password/i)).toBeInTheDocument();
  });
  it("sets message on failed login with correct password but wrong email", async () => {
    render(
      <LoginForm
        {...defaultProps}
        email="wrong@email.com"
        password="password123"
      />
    );
    await userEvent.click(screen.getByRole("button", { name: /login/i }));
    expect(screen.getByText(/invalid email or password/i)).toBeInTheDocument();
  });
});
