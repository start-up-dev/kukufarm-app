import React from 'react';
import {StyleSheet} from 'react-native';
import Toast, {
  SuccessToast,
  ErrorToast,
  InfoToast,
} from 'react-native-toast-message';
import {theme} from 'styles/theme';

const toastConfig = {
  success: (props: any) => (
    <SuccessToast
      {...props}
      text1Style={styles.successText}
      style={styles.success}
      contentContainerStyle={styles.success}
      text1NumberOfLines={5}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      text1Style={styles.errorText}
      style={styles.error}
      contentContainerStyle={styles.error}
      text1NumberOfLines={5}
    />
  ),
  info: (props: any) => (
    <InfoToast
      {...props}
      text1Style={styles.infoText}
      style={styles.info}
      contentContainerStyle={styles.info}
      text1NumberOfLines={5}
    />
  ),
};

const text1Style = {
  fontWeight: 'bold',
  fontSize: 15,
  opacity: 0.8,
  textAlign: 'center',
};

const contentContainerStyle = {
  borderRadius: 20,
  maxHeight: 150,
};

const successColor = '#3dac2aa8';
const errorColor = '#ff4949a8';
const infoColor = theme.colors.brandWarning;

const styles = StyleSheet.create({
  info: {
    ...contentContainerStyle,
    borderLeftColor: infoColor,
    backgroundColor: infoColor,
  },
  infoText: {
    ...text1Style,
    color: 'white',
  },
  success: {
    ...contentContainerStyle,
    borderLeftColor: successColor,
    backgroundColor: successColor,
  },
  successText: {
    ...text1Style,
    color: 'white',
  },
  error: {
    ...contentContainerStyle,
    borderLeftColor: errorColor,
    backgroundColor: errorColor,
  },
  errorText: {
    ...text1Style,
    color: 'white',
  },
});

type ToastType = 'success' | 'error' | 'info';
export const showAlert = (message: string, type: ToastType = 'info') => {
  Toast.hide();
  setTimeout(() => {
    Toast.show({
      type,
      topOffset: -40,
      // type: 'info',
      // type: 'success',
      // type: 'error',
      text1: message,
      position: 'bottom',
      visibilityTime: 2500,
    });
  }, 100);
};

export const AlertInitializer = () => <Toast config={toastConfig} />;
