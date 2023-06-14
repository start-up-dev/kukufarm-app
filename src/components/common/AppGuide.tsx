import {View, Text, Image, TouchableOpacity, Dimensions} from 'react-native';
import color from 'constants/color';
import Icon from './Icon';

import close from 'assets/images/close.png';

const {width, height} = Dimensions.get('window');

const AppGuide = ({onPress = () => {}}) => {
  return (
    <View
      style={{
        backgroundColor: '#F5F5F5',
        padding: 16,
        borderRadius: 7,
        position: 'absolute',
        top: height - 350,
        right: 0,
        left: 0,
      }}>
      <TouchableOpacity onPress={onPress} style={{alignItems: 'flex-end'}}>
        <Icon icon={close} m />
      </TouchableOpacity>
      <Text
        style={{
          fontFamily: 'Sora-Regular',
          fontSize: 16,
          lineHeight: 24,
          color: color.TextPrimary,
        }}>
        Coop:
      </Text>
      <Text
        style={{
          fontFamily: 'Sora-Regular',
          fontSize: 14,
          lineHeight: 24,
          color: color.TextPrimary,
        }}>
        The structure where poultry flocks are kept
      </Text>
    </View>
  );
};

export default AppGuide;
