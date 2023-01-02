import {View, StyleSheet, Image} from 'react-native';
import React from 'react';
import {theme} from 'styles/theme';
import avatar from 'assets/images/avatar.png';

interface IProps {
  size?: number;
  border?: boolean;
  borderWidth?: number;
  borderColor?: string;
  dividerColor?: string;
  source?: string;
}
export default function Avatar({
  size,
  border,
  borderColor,
  borderWidth,
  dividerColor,
  source,
}: IProps) {
  return (
    <View
      style={[
        {
          width: size || 40,
          height: size || 40,
          borderRadius: size ? size / 2 : 50,
          overflow: 'hidden',
        },
        border && {
          borderWidth: borderWidth || 2,
          borderColor: borderColor || theme.colors.primary,
        },
      ]}>
      <Image
        style={[
          {width: '100%', height: '100%', resizeMode: 'contain'},
          !!dividerColor && {
            borderWidth: 5,
            borderColor: dividerColor || 'white',
            borderRadius: size ? size / 2 : 50,
          },
        ]}
        source={source ? {uri: source} : avatar}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 90,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
});
