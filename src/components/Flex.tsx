import {View, StyleProp, ViewStyle} from 'react-native';
import React from 'react';

interface IProps {
  justify?:
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  align?: 'center' | 'flex-start' | 'flex-end' | 'stretch' | 'baseline';
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}
export default function Flex({
  align,
  children,
  direction,
  justify,
  style,
}: IProps) {
  return (
    <View
      style={[
        {
          justifyContent: justify || 'space-evenly',
          alignItems: align || 'center',
          flexDirection: direction || 'row',
        },
        style,
      ]}>
      {children}
    </View>
  );
}
