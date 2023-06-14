import {TouchableOpacity, StyleSheet, Image, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import color from 'constants/color';

const InlineButton = ({title, icon, link, flockData}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.btnView}
      onPress={() => navigation.navigate(link, flockData && {data: flockData})}>
      <Image
        source={icon}
        style={{width: 16, height: 16, resizeMode: 'contain'}}
      />
      <Text style={styles.btnText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnView: {
    borderColor: color.TextLink,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
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

export default InlineButton;
