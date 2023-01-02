import React from 'react';
import {View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {BookSize} from 'constants/Size';

const TitleSkeleton = ({style, width, height}) => {
  return (
    <View style={[{backgroundColor: 'white', zIndex: 100}, style]}>
      <SkeletonPlaceholder>
        <SkeletonPlaceholder.Item
          width={width || 200}
          height={height || 40}
          borderRadius={4}
        />
      </SkeletonPlaceholder>
    </View>
  );
};

export default TitleSkeleton;
