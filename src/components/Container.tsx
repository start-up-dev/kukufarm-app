import {View, StyleProp, ViewStyle} from 'react-native';
import React from 'react';
import {theme} from 'styles/theme';

interface IProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}
export default function Container({children, style}: IProps) {
  return (
    <View
      style={[
        {
          padding: theme.size.pageBorder,
          backgroundColor: 'white',
        },
        style,
      ]}>
      {children}
    </View>
  );
}
