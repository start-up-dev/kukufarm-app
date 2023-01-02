import {View, StyleSheet, StatusBar, Platform} from 'react-native';
import React from 'react';
import {theme} from 'styles/theme';
import LinearGradient from 'react-native-linear-gradient';

interface IProps {
  children?: React.ReactNode;
  flat?: boolean;
}
export default function AppBar({children, flat}: IProps) {
  return (
    <LinearGradient
      colors={
        flat
          ? ['white', 'white']
          : [theme.colors.primary, theme.colors.primary, theme.colors.secondary]
      }
      useAngle={true}
      angle={90}
      style={styles.container}>
      <View style={styles.containerBody}>{children}</View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    // top: -(StatusBar.currentHeight || 0),
    // backgroundColor: 'white',
    width: '100%',
    paddingHorizontal: theme.size.pageBorder,
    minHeight: Platform.OS === 'ios' ? 100 : 85,
    justifyContent: 'center',
    paddingTop:
      Platform.OS === 'ios'
        ? StatusBar?.currentHeight + 55
        : StatusBar?.currentHeight + 17,
  },
  containerBody: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
