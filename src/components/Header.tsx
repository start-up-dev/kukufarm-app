import {ColorValue, StyleSheet, View} from 'react-native';
import React from 'react';
import Container from './Container';
import Entypo from 'react-native-vector-icons/Entypo';
import {theme} from 'styles/theme';
import {navigationRef} from 'utils/navigation';
import Text from './Text';
import {statusbarHeight} from 'utils/helper';

interface IProps {
  title: string;
  options?: React.ReactNode;
  titleColor?: string;
}

const Header: React.FC<IProps> = ({title, options, titleColor}) => {
  return (
    <Container
      style={{
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingTop: statusbarHeight,
      }}>
      {/* <Entypo
          color={theme.colors.black}
          size={25}
          name="chevron-small-left"
          style={{
            fontWeight: 'bold',
          }}
          onPress={() => navigationRef.goBack()}
        /> */}

      <View style={{flexDirection: 'row'}}>
        <Text
          color={titleColor || theme.colors.black}
          // style={{fontWeight: '600'}}
          size={18}
          bold>
          {title || 'My Level'}
        </Text>
      </View>
      {options || <Text />}
    </Container>
  );
};

export default Header;

const styles = StyleSheet.create({});
