import {
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import color from 'constants/color';

const plus = require('assets/images/plus.png');

const Button = ({title, onPress = () => {}, fill, icon, mini, status}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.btnView,
        fill && {backgroundColor: color.TextLink},
        mini && {width: 165},
      ]}>
      {status === 'loading' ? (
        <ActivityIndicator color={'#fff'} />
      ) : (
        <>
          {icon && (
            <Image
              source={plus}
              style={{width: 10, height: 10, resizeMode: 'contain'}}
            />
          )}

          <Text
            style={[
              styles.btnText,
              fill && {color: color.background, fontFamily: 'Sora-SemiBold'},
            ]}>
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnView: {
    borderColor: color.TextLink,
    borderWidth: 1,
    borderRadius: 7,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontFamily: 'Sora-Regular',
    fontSize: 14,
    lineHeight: 24,
    letterSpacing: 0.25,
    color: color.TextLink,
    marginLeft: 10,
  },
});

export default Button;
