//Create an example hook with somewhat complicated logic
import { useState, useMemo } from "react";

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

type UseTaskManagerReturn = {
  tasks: Task[];
  filteredTasks: Task[];
  currentPageTasks: Task[];
  toggleTaskCompletion: (id: number) => void;
  setFilter: (filter: "all" | "completed" | "pending") => void;
  setPage: (page: number) => void;
  totalPages: number;
};

export const useTaskManager = (
  initialTasks: Task[],
  pageSize: number = 5
): UseTaskManagerReturn => {
  const [tasks, setTasks] = useState(initialTasks);
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");
  const [currentPage, setCurrentPage] = useState(1);

  const toggleTaskCompletion = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (filter === "completed") return task.completed;
      if (filter === "pending") return !task.completed;
      return true;
    });
  }, [tasks, filter]);

  const totalPages = Math.ceil(filteredTasks.length / pageSize);

  const currentPageTasks = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredTasks.slice(startIndex, endIndex);
  }, [filteredTasks, currentPage, pageSize]);

  const setPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return {
    tasks,
    filteredTasks,
    currentPageTasks,
    toggleTaskCompletion,
    setFilter,
    setPage,
    totalPages,
  };
};
