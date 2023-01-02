import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Text from './Text';
import {theme} from 'styles/theme';
import Loader from './Loader';
import Ripple from 'react-native-material-ripple';

interface IProps {
  textStyle?: StyleProp<TextStyle>;
  children?: React.ReactNode;
  loader?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  block?: boolean;
  error?: string;
  lg?: boolean;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  rounded?: boolean;
  sm?: boolean;
  xsm?: boolean;
  disabled?: boolean;
}
function Button({
  textStyle,
  children,
  loader,
  iconLeft,
  iconRight,
  block,
  error,
  lg,
  style,
  onPress,
  rounded,
  sm,
  xsm,
  disabled,
}: IProps) {
  return (
    <>
      {!!error && (
        <Text style={{marginBottom: 5}} bold color={theme.colors.danger}>
          {error}
        </Text>
      )}
      <Ripple
        disabled={loader}
        onPress={onPress}
        style={[
          {
            borderRadius: rounded ? 30 : 5,
            width: block ? '100%' : 'auto',
            paddingVertical: xsm ? 5 : sm ? 10 : lg ? 20 : 15,
            paddingHorizontal: 20,
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
          },
          styles.button,
          style,
          disabled && {
            backgroundColor: theme.colors.grey100,
          },
        ]}>
        {iconLeft && <View style={styles.iconLeft}>{iconLeft}</View>}
        {loader && <Loader size={xsm ? 10 : 20} style={{marginRight: 10}} />}
        <Text
          lg
          style={[
            styles.text,
            xsm && {fontSize: 12, fontWeight: '600'},
            textStyle,
          ]}>
          {children}
        </Text>
        {iconRight && <View style={styles.iconRight}>{iconRight}</View>}
      </Ripple>
    </>
  );
}

const styles = StyleSheet.create({
  iconLeft: {
    position: 'absolute',
    width: '100%',
  },
  iconRight: {
    position: 'absolute',
    width: '100%',
    alignItems: 'flex-end',
  },
  button: {
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  text: {
    color: theme.colors.white,
  },
});

export default Button;
