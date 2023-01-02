import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import React, {FC} from 'react';
import {classes, theme} from 'styles/theme';
import {navigationRef} from 'utils/navigation';

interface IProps {
  showBack?: boolean;
  title?: string;
  options?: React.ReactNode;
}

const TransparentHeader: FC<IProps> = ({showBack, title, options}) => {
  return (
    <>
      <View
        style={[
          {
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingBottom: 30,
            paddingTop: 10,
            paddingHorizontal: 25,

            marginBottom: 5,

            // backgroundColor: 'red',
          },
          classes.shadow,
        ]}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {showBack && (
            <TouchableOpacity onPress={() => navigationRef.goBack()}>
              <Image
                style={{width: 16, height: 15, marginRight: 7}}
                source={require('assets/icons/back_w.png')}
              />
            </TouchableOpacity>
          )}
          {title ? (
            <Text
              style={{
                color: theme.colors.white,
                fontSize: 18,
                textAlign: 'left',
              }}>
              {title}
            </Text>
          ) : null}
        </View>
        {options}
      </View>
    </>
  );
};

export default TransparentHeader;
