import React from 'react';
import {RefreshControl} from 'react-native';
import {theme} from 'styles/theme';

interface IProps {
  onRefresh?: () => void;
  refreshing?: boolean;
  colors?: string[];
  tintColor?: string;
}
const Refresh = ({
  onRefresh,
  refreshing = false,
  colors = [theme.colors.white],
  tintColor = theme.colors.primary,
  ...rest
}: IProps) => (
  <RefreshControl
    {...rest}
    tintColor={tintColor}
    colors={colors}
    refreshing={refreshing}
    onRefresh={onRefresh}
  />
);

export default Refresh;
