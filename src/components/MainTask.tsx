import { VFC, useState } from 'react';
import { useHistory } from 'react-router';
import { ChevronDoubleRightIcon } from '@heroicons/react/solid';

import TaskList from './TaskList';
import TaskEdit from './TaskEdit';

interface MainTaskProps {}

const MainTask: VFC<MainTaskProps> = () => {
  const history = useHistory();

  const [debugText, setDebugText] = useState('');

  console.log('rendered MainTask');

  return (
    <>
      <input
        className="mb-3 px-3 py-2 border border-gray-300"
        placeholder="dummy text ?"
        type="text"
        onChange={(e) => setDebugText(e.target.value)}
        value={debugText}
      />

      <p className="mb-10 text-xl font-bold">Task</p>

      <div className="grid grid-cols-2 gap-40">
        <TaskList />
        <TaskEdit />
      </div>

      <ChevronDoubleRightIcon
        className="h-5 w-5 mt-2 text-blue-500 cursor-pointer"
        onClick={() => history.push('/tags')}
      />
      <p>Tag Page</p>
    </>
  );
};

export default MainTask;
