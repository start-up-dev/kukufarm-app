import React from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {theme} from 'styles/theme';
import {Edge, SafeAreaView} from 'react-native-safe-area-context';
import Space from './Space';

interface IProps {
  children: React.ReactNode;
  edge?: readonly Edge[];
  darkStatusbar?: boolean;
  translucent?: boolean;
  statusbarColor?: string;
  noSpace?: boolean;
  safeArea?: boolean;
}

function Layout({
  children,
  noSpace,
  darkStatusbar,
  translucent = true,
  statusbarColor = 'transparent',
  safeArea,
  edge,
}: IProps) {
  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <StatusBar
        translucent={translucent}
        backgroundColor={statusbarColor}
        barStyle={darkStatusbar ? 'dark-content' : 'light-content'}
      />
      {safeArea ? (
        <SafeAreaView
          edges={edge}
          style={{flex: 1, backgroundColor: theme.colors.white}}>
          <View
            style={{
              flex: 1,
              // height: '100%',
              backgroundColor: '#f6f6f6',
            }}>
            {children}
            {!noSpace && <Space height={theme.size.tabBarHeight} />}
          </View>
        </SafeAreaView>
      ) : (
        <View
          style={{
            flex: 1,
            // height: '100%',
            backgroundColor: '#f6f6f6',
          }}>
          {children}
          {!noSpace && <Space height={theme.size.tabBarHeight} />}
        </View>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  backgroundImages: {
    position: 'absolute',
    width: 100,
    height: 100,
  },
});

export default Layout;
