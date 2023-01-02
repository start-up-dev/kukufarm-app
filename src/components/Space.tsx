import React from 'react';
import {View} from 'react-native';

interface IProps {
  width?: number;
  height?: number;
}
function Space({width, height}: IProps) {
  return <View style={{width: width || 0, height: height || 0}}></View>;
}

export default Space;
