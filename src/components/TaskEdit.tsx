import { VFC, memo, FormEvent } from 'react';

import { useAppSelector, useAppDispatch } from '../app/hooks';
import { setEditedTask, selectTask } from '../slices/todoSlice';

import { useQueryTags } from '../hooks/useQueryTags';
import { useMutateTask } from '../hooks/useMutateTask';

interface TaskEditProps {}

const TaskEdit: VFC<TaskEditProps> = () => {
  const dispatch = useAppDispatch();

  const editedTask = useAppSelector(selectTask);

  const { status, data: tags } = useQueryTags();

  const { createTaskMutation, updateTaskMutation } = useMutateTask();

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // [Fix] これだとID=0のタスクの更新ができないので、バックエンド側でタスクのIDを1始まりになるようにしなければならない
    if (editedTask.id === 0) createTaskMutation.mutate(editedTask);
    else {
      updateTaskMutation.mutate(editedTask);
    }
  };

  const tagOptions = tags?.map((tag) => (
    <option key={tag.id} value={tag.id}>
      {tag.name}
    </option>
  ));

  console.log('rendered TaskEdit');

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'error') return <div>Error</div>;
  if (updateTaskMutation.isLoading) {
    return <span>Updating...</span>;
  }
  if (createTaskMutation.isLoading) {
    return <span>Creating...</span>;
  }

  return (
    <div className="">
      {/* タスクの入力フォーム */}
      <form onSubmit={handleOnSubmit}>
        <input
          className="mb-3 px-3 py-2 border border-gray-300"
          placeholder="new task ?"
          type="text"
          onChange={(e) => {
            dispatch(setEditedTask({ ...editedTask, title: e.target.value }));
          }}
          value={editedTask.title}
        />
        <button
          className="disabled:opacity-40 my-3 py-2 px-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded"
          disabled={!(editedTask.title && editedTask.tag)}
        >
          {editedTask.id === 0 ? 'Create' : 'Update'}
        </button>
      </form>

      {/* タグのセレクター */}
      <select
        className="mb-3 px-3 py-2 border border-gray-300"
        value={editedTask.tag}
        onChange={(e) => {
          dispatch(
            setEditedTask({ ...editedTask, tag: Number(e.target.value) })
          );
        }}
      >
        <option value={0}>Tag</option>
        {tagOptions}
      </select>
    </div>
  );
};

export default memo(TaskEdit);
