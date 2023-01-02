import {StyleSheet, View, Image, StatusBar} from 'react-native';
import React, {FC} from 'react';
import {theme, classes} from 'styles/theme';
import Space from './Space';
import {statusbarHeight} from 'utils/helper';
import Text from './Text';

interface IProps {
  showBack?: boolean;
  title?: string;
  options?: React.ReactNode;
}
const HeaderRadius: FC<IProps> = ({showBack, title, options}) => {
  return (
    <>
      <View
        style={[
          {
            backgroundColor: 'white',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingBottom: 30,
            // paddingTop: 10,
            paddingHorizontal: 25,

            marginBottom: 5,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,

            // backgroundColor: 'red',
            paddingTop: statusbarHeight,
          },
          classes.shadow,
        ]}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {showBack && (
            <Image
              style={{width: 16, height: 15, marginRight: 7}}
              source={require('assets/icons/back.png')}
            />
          )}
          {title && (
            <Text
              style={{
                color: theme.colors.primary,
                fontSize: 19,
                textAlign: 'left',
              }}
              bold>
              {title}
            </Text>
          )}
        </View>
        {options}
      </View>
    </>
  );
};

export default HeaderRadius;
