/** タスクモデル */
export interface Task {
  id: number;
  title: string;
  tag: number;
  tag_name: number;
  created_at: string;
  updated_at: string;
}

/** 編集中のタスクモデル */
export interface EditTask {
  id: number;
  title: string;
  tag: number;
}

/** タグモデル */
export interface Tag {
  id: number;
  name: string;
}
