import React from 'react';
import {View, StyleProp, ViewStyle} from 'react-native';

interface IProps {
  children: React.ReactNode;
  start?: boolean;
  style?: StyleProp<ViewStyle>;
}
function Row({children, start, style}: IProps) {
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          justifyContent: start ? 'flex-start' : 'space-between',
          alignItems: 'center',
        },
        style,
      ]}>
      {children}
    </View>
  );
}

export default Row;
