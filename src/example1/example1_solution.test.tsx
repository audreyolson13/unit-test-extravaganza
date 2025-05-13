import { render, screen } from "@testing-library/react";
import React from "react";
import ExampleComponent, {
  filterActiveUsers,
  formatUserName,
} from "./example1";
import "@testing-library/jest-dom";

describe.skip("<ExampleComponent>", () => {
  it("displays 'No active users found' if list is empty", () => {
    render(<ExampleComponent users={[]} />);

    expect(screen.getByText("User List")).toBeInTheDocument();
    expect(screen.getByText("No active users found.")).toBeInTheDocument();
  });
  it("dispalys users with names", () => {
    const users = [
      { id: 1, name: "Alice", isActive: true },
      { id: 2, name: "Bob", isActive: true },
    ];

    render(<ExampleComponent users={users} />);

    expect(screen.getByText("ALICE")).toBeInTheDocument();
    expect(screen.getByText("BOB")).toBeInTheDocument();
  });
  it('displays "true" when bool is true', () => {
    const users = [
      { id: 1, name: "Alice", isActive: true },
      { id: 2, name: "Bob", isActive: true },
    ];

    render(<ExampleComponent users={users} bool={true} />);

    expect(screen.getByText("true")).toBeInTheDocument();
  });
});

describe.skip("filterActiveUsers", () => {
  it("returns only active users", () => {
    const users = [
      { id: 1, name: "Alice", isActive: true },
      { id: 2, name: "Bob", isActive: false },
      { id: 3, name: "Charlie", isActive: true },
    ];

    const result = filterActiveUsers(users);

    expect(result).toEqual([
      { id: 1, name: "Alice", isActive: true },
      { id: 3, name: "Charlie", isActive: true },
    ]);
  });
});

describe.skip("formatUserName", () => {
  it("returns the user's name in uppercase", () => {
    const user = { id: 1, name: "Alice", isActive: true };
    const result = formatUserName(user);
    expect(result).toBe("ALICE");
  });

  it("returns 'Unknown User' if name is empty", () => {
    const user = { id: 1, name: "", isActive: true };
    const result = formatUserName(user);
    expect(result).toBe("Unknown User");
  });
});
