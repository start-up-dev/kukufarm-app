import React from 'react';
import {View} from 'react-native';

interface IProps {
  hr?: boolean;
  vr?: boolean;
  length?: string;
  color?: string;
  space?: number;
  style?: any;
}
const Divider = ({hr, vr, length = '100%', color, space, style}: IProps) => {
  return (
    <View
      style={{
        borderWidth: 0.2,
        height: hr ? length : 0,
        width: vr ? length : 0,
        borderColor: color || '#CCCCCC',
        opacity: 0.2,
        marginHorizontal: hr ? space : 0,
        marginVertical: vr ? space : 0,
        ...style,
      }}
    />
  );
};

export default Divider;
