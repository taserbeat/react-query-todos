import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../app/store';
import { EditTask, Tag } from '../types/types';

export interface TaskState {
  editedTask: EditTask;
  editedTag: Tag;
}

const initialState: TaskState = {
  editedTask: {
    id: 0,
    title: '',
    tag: 0,
  },
  editedTag: {
    id: 0,
    name: '',
  },
};

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    /** 編集中のタスクを更新する */
    setEditedTask: (state, action: PayloadAction<EditTask>) => {
      state.editedTask = action.payload;
    },
    /** 編集中のタスクを初期化する */
    resetEditedTask: (state) => {
      state.editedTask = initialState.editedTask;
    },
    /** 編集中のタグを更新する */
    setEditedTag: (state, action: PayloadAction<Tag>) => {
      state.editedTag = action.payload;
    },
    /** 編集中のタグを初期化する */
    resetEditedTag: (state) => {
      state.editedTag = initialState.editedTag;
    },
  },
});

export const { setEditedTask, resetEditedTask, setEditedTag, resetEditedTag } =
  taskSlice.actions;

/** タスクのステートを取り出す関数 */
export const selectTask = (state: RootState) => state.task.editedTask;
/** タグのステートを取り出す関数 */
export const selectTag = (state: RootState) => state.task.editedTag;

export default taskSlice.reducer;
