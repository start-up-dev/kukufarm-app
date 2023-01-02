import React from 'react';
import {ActivityIndicator, StyleProp, ViewStyle} from 'react-native';
import {theme} from 'styles/theme';

interface IProps {
  style?: StyleProp<ViewStyle>;
  color?: string;
  size?: 'large' | 'small';
}
const ActivityInd = ({
  color = theme.colors.primary,
  size = 'large',
  style,
}: IProps) => {
  return <ActivityIndicator size={size} color={color} style={style} />;
};

export default ActivityInd;
