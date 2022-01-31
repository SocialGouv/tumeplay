import ContentLoader, {Path, Circle} from 'react-content-loader/native';
import React from 'react';

const BadgesSkeleton = props => {
  return (
    <ContentLoader
      speed={2}
      width={91}
      height={104}
      viewBox="0 0 91 104"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}>
      <Path d="M 45.22 2 L 2 26.576 V 77 l 43.22 25 l 44.068 -25 V 26.576 L 45.22 2 z" />
      <Circle cx="66" cy="86" r="15" />
      <Path d="M 72 82 h -1 v -2 c 0 -2.76 -2.24 -5 -5 -5 s -5 2.24 -5 5 v 2 h -1 c -1.1 0 -2 0.9 -2 2 v 10 c 0 1.1 0.9 2 2 2 h 12 c 1.1 0 2 -0.9 2 -2 V 84 c 0 -1.1 -0.9 -2 -2 -2 z m -9 -2 c 0 -1.66 1.34 -3 3 -3 s 3 1.34 3 3 v 2 h -6 v -2 z m 9 14 H 60 V 84 h 12 v 10 z m -6 -3 c 1.1 0 2 -0.9 2 -2 s -0.9 -2 -2 -2 s -2 0.9 -2 2 s 0.9 2 2 2 z" />
    </ContentLoader>
  );
};

export default BadgesSkeleton;
