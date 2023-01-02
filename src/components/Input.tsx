import React from 'react';
import {
  TextInput as RNInput,
  StyleSheet,
  View,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {theme} from 'styles/theme';
import Text from './Text';

interface IProps extends React.ComponentProps<typeof RNInput> {
  label?: string;
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  error?: string;
  rounded?: boolean;
  icon?: React.ReactElement;
  iconRight?: React.ReactElement;
}
function Input({
  label,
  error,
  style,
  rounded,
  icon,
  iconRight,
  containerStyle,
  ...rest
}: IProps) {
  return (
    <View style={[{...styles.container}, containerStyle]}>
      {label && (
        <Text size={30} center style={styles.label} color={'#444'}>
          {label}
        </Text>
      )}
      {icon && <View style={styles.icon}>{icon}</View>}
      <RNInput
        style={[
          styles.input,
          {
            borderRadius: rounded ? 30 : 5,
            paddingLeft: icon ? 45 : 20,
            paddingRight: 20,
          },
          style,
        ]}
        {...rest}
        placeholderTextColor={'#888'}
      />
      {iconRight && <View style={styles.iconRight}>{iconRight}</View>}
      {error ? (
        <Text
          bold
          style={{marginTop: 5, marginLeft: 5}}
          color={theme.colors.danger}>
          {error}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
    zIndex: 1,
    marginLeft: 15,
  },
  iconRight: {
    position: 'absolute',
    zIndex: 1,
    right: 15,
  },
  label: {
    marginBottom: 10,
  },
  container: {
    // flex: 1,
    // flexDirection: 'column',
    // justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    width: '100%',
    paddingVertical: 13,
    fontSize: 15,
    color: theme.colors.black,
    borderColor: '#cfcdcf',
  },
});

export default Input;
