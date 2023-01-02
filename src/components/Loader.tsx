import React from 'react';
import {View, StyleProp, ViewStyle} from 'react-native';
import Spinner from 'react-native-spinkit';

interface IProps {
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
}
function Loader({color, size, style}: IProps) {
  return (
    <View>
      <Spinner
        style={style}
        isVisible={true}
        size={size || 30}
        type="Circle"
        color={color || 'white'}
      />
    </View>
  );
}

export default Loader;
