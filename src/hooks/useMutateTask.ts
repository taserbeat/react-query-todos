import axios from 'axios';
import { useQueryClient, useMutation } from 'react-query';

import { useAppDispatch } from '../app/hooks';
import { resetEditedTask } from '../slices/todoSlice';
import { Task, EditTask } from '../types/types';

export const useMutateTask = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const createTaskMutation = useMutation(
    (task: Omit<EditTask, 'id'>) =>
      axios.post<Task>(`${process.env.REACT_APP_REST_URL}/api/tasks/`, task),
    {
      // onSuccessはaxiosの通信が成功したときに実行されるコールバック
      onSuccess: (response) => {
        // キャッシュに保存された前回のタスクデータを取り出す
        const previousTasks = queryClient.getQueryData<Task[]>('tasks');

        // キャッシュにタスクデータが存在していれば、新規作成したタスクデータを追加する
        if (previousTasks) {
          queryClient.setQueryData<Task[]>('tasks', [
            ...previousTasks,
            response.data,
          ]);
        }

        dispatch(resetEditedTask());
      },
    }
  );

  const updateTaskMutation = useMutation(
    (task: EditTask) =>
      axios.put<Task>(
        `${process.env.REACT_APP_REST_URL}/api/tasks/${task.id}/`,
        task
      ),
    {
      // 第一引数にはレスポンスのデータが格納されている
      // 第二引数にはリクエストで渡したデータ(編集したタスクデータ)が格納されている
      onSuccess: (response, variables) => {
        const previousTasks = queryClient.getQueryData<Task[]>('tasks');
        if (previousTasks) {
          queryClient.setQueryData<Task[]>(
            'tasks',
            previousTasks.map((previousTask) =>
              previousTask.id === variables.id ? response.data : previousTask
            )
          );
        }
        dispatch(resetEditedTask());
      },
    }
  );

  const deleteTaskMutation = useMutation(
    (id: number) =>
      axios.delete(`${process.env.REACT_APP_REST_URL}/api/tasks/${id}/`),
    {
      onSuccess: (response, variables) => {
        const previousTasks = queryClient.getQueryData<Task[]>('tasks');
        if (previousTasks) {
          queryClient.setQueryData(
            'tasks',
            previousTasks.filter(
              (previousTask) => previousTask.id !== variables
            )
          );
        }
        dispatch(resetEditedTask());
      },
    }
  );

  return {
    createTaskMutation,
    updateTaskMutation,
    deleteTaskMutation,
  };
};

export default useMutateTask;
