//Create a semi-complicated example component to test using render
import React, { useState } from "react";

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

const TaskManager: React.FC<{ initialTasks: Task[] }> = ({ initialTasks }) => {
  const [tasks, setTasks] = useState(initialTasks);
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");

  const toggleTaskCompletion = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  return (
    <div>
      <h1>Task Manager</h1>
      <div>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
        <button onClick={() => setFilter("pending")}>Pending</button>
      </div>
      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id}>
            <label>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTaskCompletion(task.id)}
              />
              {task.title}
            </label>
          </li>
        ))}
      </ul>
      {filteredTasks.length === 0 && <p>No tasks found.</p>}
    </div>
  );
};

export default TaskManager;
