import {StyleProp, StyleSheet, TextStyle, View, ViewStyle} from 'react-native';
import React from 'react';
import {theme} from 'styles/theme';
import Text from './Text';
import Space from './Space';

interface IProps {
  bgColor: string;
  icon?: React.ReactNode;
  text: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}
const Tag: React.FC<IProps> = ({bgColor, icon, text, style, textStyle}) => {
  return (
    <View
      style={[
        {
          backgroundColor: bgColor || theme.colors.secondary,
          // padding: 1,
          paddingHorizontal: 7,
          borderRadius: 50,
          flexDirection: 'row',
          alignSelf: 'flex-start',
          alignItems: 'center',
          marginRight: 5,
        },
        style,
      ]}>
      {icon}
      <Space width={3} />
      <Text size={10} color={theme.colors.white} style={textStyle}>
        {text || 'Entertainment'}
      </Text>
    </View>
  );
};

export default Tag;

const styles = StyleSheet.create({});
