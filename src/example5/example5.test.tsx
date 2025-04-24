import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginForm from "./example5";

describe("<LoginForm>", () => {
  it("fireEvent does not simulate typing realistically", () => {
    render(<LoginForm />);

    // Simulate typing into the email field
    const emailInput = screen.getByLabelText(/email/i);
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });

    // Simulate typing into the password field
    const passwordInput = screen.getByLabelText(/password/i);
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    // Simulate clicking the login button
    const loginButton = screen.getByRole("button", { name: /login/i });
    fireEvent.click(loginButton);

    // Assert that the success message is displayed
    expect(screen.getByText(/login successful!/i)).toBeInTheDocument();
  });
  it("allows the user to log in with correct credentials", async () => {
    render(<LoginForm />);

    // Simulate typing into the email and password fields
    await userEvent.type(screen.getByLabelText(/email/i), "test@example.com");
    await userEvent.type(screen.getByLabelText(/password/i), "password123");

    // Simulate clicking the login button
    await userEvent.click(screen.getByRole("button", { name: /login/i }));

    // Assert that the success message is displayed
    expect(screen.getByText(/login successful!/i)).toBeInTheDocument();
  });

  it("shows an error message for invalid credentials", async () => {
    render(<LoginForm />);

    // Simulate typing incorrect credentials
    await userEvent.type(screen.getByLabelText(/email/i), "wrong@example.com");
    await userEvent.type(screen.getByLabelText(/password/i), "wrongpassword");

    // Simulate clicking the login button
    await userEvent.click(screen.getByRole("button", { name: /login/i }));

    // Assert that the error message is displayed
    expect(screen.getByText(/invalid email or password/i)).toBeInTheDocument();
  });
});
