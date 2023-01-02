import React from 'react';
import {View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {BookSize} from 'constants/Size';

const BookSkeleton = ({style}) => {
  return (
    <View style={[{backgroundColor: 'white', zIndex: 100}, style]}>
      <SkeletonPlaceholder>
        <SkeletonPlaceholder.Item
          width={BookSize.width}
          height={BookSize.height}
          borderRadius={4}
        />
      </SkeletonPlaceholder>
    </View>
  );
};

export default BookSkeleton;
