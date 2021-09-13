import { useQuery, UseQueryResult } from 'react-query';
import axios from 'axios';

import { Task } from '../types/types';

export const useQueryTasks = (): UseQueryResult<Task[], Error> => {
  const getTasks = async (): Promise<Task[]> => {
    const response = await axios.get<Task[]>(
      `${process.env.REACT_APP_REST_URL}/api/tasks/`
    );
    const tasks = response.data;

    return tasks;
  };

  const tasksQueryResult = useQuery<Task[], Error>({
    queryKey: 'tasks',
    queryFn: getTasks,
    staleTime: 0,
  });

  return tasksQueryResult;
};

export default useQueryTasks;
