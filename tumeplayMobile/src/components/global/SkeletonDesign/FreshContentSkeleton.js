import ContentLoader, {Rect} from 'react-content-loader/native';
import React from 'react';

const FreshContentSkeleton = () => {
  return (
    <ContentLoader viewBox="0 0 160 150" speed={2}>
      <Rect x="0" y="0" rx="3" ry="3" width="100%" height="150" />
      <Rect x="0" y="0" rx="3" ry="3" width="100%" height="150" />
      <Rect x="0" y="0" rx="3" ry="3" width="100%" height="150" />
    </ContentLoader>
  );
};

export default FreshContentSkeleton;
