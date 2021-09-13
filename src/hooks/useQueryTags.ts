import { useQuery, UseQueryResult } from 'react-query';
import axios from 'axios';

import { Tag } from '../types/types';

export const useQueryTags = (): UseQueryResult<Tag[], Error> => {
  const getTags = async (): Promise<Tag[]> => {
    const response = await axios.get<Tag[]>(
      `${process.env.REACT_APP_REST_URL}/api/tags/`
    );

    const tags = response.data;

    return tags;
  };

  const tagsQueryResult = useQuery<Tag[], Error>({
    queryKey: 'tags',
    queryFn: getTags,
    staleTime: 60000,
  });

  return tagsQueryResult;
};

export default useQueryTags;
