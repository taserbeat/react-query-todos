import axios from 'axios';
import { useQueryClient, useMutation } from 'react-query';

import { useAppDispatch } from '../app/hooks';
import { resetEditedTag } from '../slices/todoSlice';
import { Tag } from '../types/types';

export const useMutateTag = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const createTagMutation = useMutation(
    (tag: Omit<Tag, 'id'>) =>
      axios.post<Tag>(`${process.env.REACT_APP_REST_API}/api/tags/`, tag),
    {
      onSuccess: (response) => {
        const previousTags = queryClient.getQueryData<Tag[]>('tags');
        if (previousTags) {
          queryClient.setQueryData<Tag[]>('tags', [
            ...previousTags,
            response.data,
          ]);
        }
        dispatch(resetEditedTag());
      },
    }
  );

  const updateTagMutation = useMutation(
    (tag: Tag) =>
      axios.put<Tag>(
        `${process.env.REACT_APP_REST_API}/api/tags/${tag.id}`,
        tag
      ),
    {
      onSuccess: (response, variables) => {
        const previousTags = queryClient.getQueryData<Tag[]>('tags');

        if (previousTags) {
          queryClient.setQueryData<Tag[]>(
            'tags',
            previousTags.map((previousTag) =>
              previousTag.id === variables.id ? response.data : previousTag
            )
          );
        }
        dispatch(resetEditedTag);
      },
    }
  );

  const deleteTagMutation = useMutation(
    (id: number) =>
      axios.delete<Tag>(`${process.env.REACT_APP_REST_URL}/api/tags/${id}/`),
    {
      onSuccess: (_, variables) => {
        const previousTags = queryClient.getQueryData<Tag[]>('tags');

        if (previousTags) {
          queryClient.setQueryData<Tag[]>(
            'tags',
            previousTags.filter((previousTag) => previousTag.id !== variables)
          );
        }
        dispatch(resetEditedTag());
      },
    }
  );

  return {
    createTagMutation,
    updateTagMutation,
    deleteTagMutation,
  };
};

export default useMutateTag;
