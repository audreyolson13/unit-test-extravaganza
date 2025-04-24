import React from "react";

type User = {
  id: number;
  name: string;
  isActive: boolean;
};

// Utility function to filter active users
export const filterActiveUsers = (users: User[]): User[] => {
  return users.filter((user) => user.isActive);
};

// Utility function to format a user's name
export const formatUserName = (user: User): string => {
  if (!user.name) {
    return "Unknown User";
  }
  return user.name.toUpperCase();
};

// React component
const ExampleComponent: React.FC<{ users: User[]; bool?: boolean }> = ({
  users,
  bool = false,
}) => {
  const activeUsers = filterActiveUsers(users);
  let change = false;

  if (bool) change = true;

  return (
    <div>
      <h1>User List</h1>
      <h2>{change ? "true" : "false"}</h2>
      {activeUsers.length > 0 ? (
        <ul>
          {activeUsers.map((user) => (
            <li key={user.id}>{formatUserName(user)}</li>
          ))}
        </ul>
      ) : (
        <p>No active users found.</p>
      )}
    </div>
  );
};

export default ExampleComponent;
