import { VFC, memo } from 'react';

import useQueryTasks from '../hooks/useQueryTasks';
import TaskItem from './TaskItem';

interface TaskListProps {}

const TaskList: VFC<TaskListProps> = (props) => {
  const { status, data: tasks } = useQueryTasks();

  console.log('rendered TaskList');

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'error') return <div>Error</div>;

  return (
    <div>
      {tasks?.map((task) => (
        <ul key={task.id}>
          <TaskItem task={task} />
        </ul>
      ))}
    </div>
  );
};

export default memo(TaskList);
