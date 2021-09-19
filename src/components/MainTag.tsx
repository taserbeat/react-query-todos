import { VFC } from 'react';
import { useHistory } from 'react-router';
import { ChevronDoubleLeftIcon } from '@heroicons/react/solid';

interface MainTagProps {}

const MainTag: VFC = (props: MainTagProps) => {
  const history = useHistory();

  console.log('rendered MainTag');

  return (
    <>
      <p className="mb-10 text-xl font-bold">Tags</p>
      <ChevronDoubleLeftIcon
        className="h-5 w-5 mt-2 text-blue-500 cursor-pointer"
        onClick={() => history.push('/')}
      />
      <p>Task Page</p>
    </>
  );
};

export default MainTag;
