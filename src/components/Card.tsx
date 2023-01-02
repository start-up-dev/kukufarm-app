import {View, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import {Shadow} from 'react-native-shadow-2';
import React from 'react';

interface IProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  startColor?: string;
}
export default function Card({
  children,
  containerStyle,
  style,
  startColor,
  ...props
}: IProps) {
  return (
    <Shadow
      viewStyle={[styles.container, containerStyle]}
      offset={[0, 5]}
      startColor={startColor || '#00000017'}
      {...props}>
      <View style={[styles.containerMain, style]}>{children}</View>
    </Shadow>
  );
}

const styles = StyleSheet.create({
  containerMain: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'white',
    width: '100%',
    paddingHorizontal: 15,
    paddingVertical: 15,
    justifyContent: 'center',
    borderRadius: 10,
  },
});
