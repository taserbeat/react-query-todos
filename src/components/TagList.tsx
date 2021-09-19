import { VFC, memo } from 'react';

import { useQueryTags } from '../hooks/useQueryTags';
import TagItem from './TagItem';

interface TagListProps {}

const TagList: VFC<TagListProps> = () => {
  const { status, data: tags } = useQueryTags();

  console.log('rendered TagList');

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'error') return <div>Error</div>;

  return (
    <div>
      {tags?.map((tag) => (
        <div key={tag.id}>
          <ul>
            <TagItem tag={tag} />
          </ul>
        </div>
      ))}
    </div>
  );
};

export default memo(TagList);
