//Create a file that uses graphql
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
    </div>
  );
};

export default TaskList;
