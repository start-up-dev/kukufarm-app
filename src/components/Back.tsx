import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  StatusBar,
  ColorValue,
} from 'react-native';
import Text from './Text';
import Icon from 'react-native-vector-icons/Feather';
import {theme} from 'styles/theme';
import {useNavigation} from '@react-navigation/native';
import Space from './Space';

interface IProps {
  style?: StyleProp<ViewStyle>;
  title?: string;
  float?: boolean;
  options?: React.ReactNode;
  dark?: boolean;
  titleColor?: string;
}

function BackButton({style, title, float, options, dark, titleColor}: IProps) {
  const navigation = useNavigation();
  const back = () => {
    navigation.goBack();
  };
  return (
    <View
      style={[
        styles.container,
        float && {
          position: 'absolute',
        },
      ]}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity onPress={back} style={[styles.button, style]}>
          <Icon
            name="chevron-left"
            size={25}
            color={dark ? 'black' : 'white'}
          />
        </TouchableOpacity>
        <Space width={10} />
        <Text
          bold
          size={20}
          color={!!titleColor ? titleColor : dark ? 'black' : 'white'}>
          {title}
        </Text>
      </View>
      <View>{options}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  button: {
    // margin: theme.size.pageBorder,
    zIndex: 1,
    // width: 40,
    // height: 40,
    borderRadius: 25,
    // alignItems: 'center',
    // justifyContent: 'center',
    // flexDirection: 'row',
  },
});

export default BackButton;
