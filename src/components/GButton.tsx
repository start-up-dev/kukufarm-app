import {
  View,
  StyleSheet,
  StatusBar,
  Platform,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {theme} from 'styles/theme';
import LinearGradient from 'react-native-linear-gradient';

interface IProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  active: boolean;
  inactiveColors?: string[];
}
export default function GButton({
  children,
  style,
  active,
  inactiveColors,
}: IProps) {
  return (
    <LinearGradient
      colors={
        active
          ? [theme.colors.primary, theme.colors.primary, theme.colors.secondary]
          : inactiveColors || ['#ddd', '#ddd']
      }
      useAngle={true}
      angle={90}
      style={[styles.container, style]}>
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.size.pageBorder,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
