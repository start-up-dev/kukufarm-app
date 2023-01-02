import {StyleSheet, Platform} from 'react-native';

export const theme = {
  colors: {
    primary: '#104378',
    secondary: '#2f74bc',
    pink: '#EE4C77',
    secondary100: '#ffb5c9',
    brand: '#7DDCBC',
    brandYellow: '#DFC57F',
    white: '#FFFFFF',
    white100: '#ffffff6e',
    black: 'black',
    yellow: '#F9D119',
    danger: '#FF0000',
    red100: '#ff4949',
    bgTransparent: '#88888844',
    blue: '#1E90FF',
    grey100: '#c4c4c4',
    grey500: '#808285',
    green100: '#00c100',
    orange100: '#ffc300',
    layoutBg: '#f6f6f6',
    silver: '#818181',
    brandInfo: '#62B1F6',
    brandSuccess: '#5cb85c',
    brandDanger: '#F32013', // '#d9534f',
    brandWarning: '#f0ad4e',
    brandDark: '#000',
    brandLight: '#a9a9a9',
    darkOverlayColor: '#000000d0',
  },
  size: {
    pageBorder: 15,
    title: 20,
    tabBarHeight: Platform.OS === 'android' ? 60 : 88,
  },
};

export const classes = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: theme.colors.primary,
  },
  brandFont: {fontFamily: 'Rubik-Regular'},

  shadow: {
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.15,
    shadowRadius: 2,
  },
  dShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  lShadow: {
    shadowColor: '#ccc',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,

    elevation: 2,
  },
});
