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
