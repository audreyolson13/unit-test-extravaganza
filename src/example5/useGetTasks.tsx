// This file is part of the example5 folder in the src directory.
// It contains the useGetTasks hook which is used to fetch tasks from a GraphQL API.
// It uses Apollo Client to manage the data fetching and state.
// It is used in the example5.tsx file to render a list of tasks.
import { useQuery, gql } from "@apollo/client";

export type Task = {
  id: number;
  title: string;
  completed: boolean;
};

export const GET_TASKS = gql`
  query GetTasks {
    tasks {
      id
      title
      completed
    }
  }
`;

const useGetTasks = () => {
  return useQuery<{ tasks: Task[] }>(GET_TASKS);
};

export default useGetTasks;
