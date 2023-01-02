import React from 'react';
import {View, StyleProp, ViewStyle} from 'react-native';
import Spinner from 'react-native-spinkit';
import {useCustomSelector} from 'store';
import Flex from './Flex';
import Space from './Space';
import Text from './Text';

interface IProps {
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
}
function RootLoader({color, size, style}: IProps) {
  const {loader} = useCustomSelector(state => state.global);
  if (!loader) {
    return null;
  }
  return (
    <View
      style={{
        flex: 1,
        position: 'absolute',
        zIndex: 10000,
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#07070770',
      }}>
      <Flex
        style={{
          backgroundColor: '#070707b3',
          paddingHorizontal: 20,
          paddingVertical: 15,
          borderRadius: 10,
        }}>
        <Spinner
          style={style}
          isVisible={true}
          size={size || 30}
          type="Circle"
          color={color || 'white'}
        />
        <Space width={10} />
        <Text dark bold>
          Loading
        </Text>
      </Flex>
    </View>
  );
}

export default RootLoader;
