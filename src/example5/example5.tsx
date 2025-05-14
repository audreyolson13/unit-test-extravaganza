//AI prompt: Create a file that uses graphql
// This is a simple react component that fetches tasks from a GraphQL API using Apollo Client.
// It uses a custom hook to manage the data fetching and state.
import React from "react";
import useGetTasks from "./useGetTasks";

const TaskList: React.FC = () => {
  const { loading, error, data } = useGetTasks();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Task List</h1>
      <ul>
        {data?.tasks.map((task) => (
          <li key={task.id}>
            <label>
              <input type="checkbox" checked={task.completed} readOnly />
              {task.title}
            </label>
          </li>
        ))}
      </ul>
      {data?.tasks.length === 0 && <p>No tasks found.</p>}
    </div>
  );
};

export default TaskList;
