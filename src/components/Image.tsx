import {
  View,
  StyleSheet,
  Image as RNImage,
  StyleProp,
  ImageStyle,
} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
interface IProps {
  size?: number;
  uri?: string;
  style?: StyleProp<ImageStyle>;
  source?: any;
  resizeMode?: any;
}
export default function Image({size, uri, style, source, resizeMode}: IProps) {
  return (
    <View
      style={[
        {
          width: size || 90,
          height: size || 70,
          borderRadius: 10,
          overflow: 'hidden',
        },
        style,
      ]}>
      <FastImage
        style={{width: '100%', height: '100%'}}
        resizeMode={resizeMode || FastImage.resizeMode.contain}
        source={
          source || {
            uri:
              uri ||
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTftnOiS_8Ku7CWKALhjxyr-gV15Ddmf4cyHg&usqp=CAUg',
            priority: FastImage.priority.normal,
          }
        }
      />
    </View>
  );
}
