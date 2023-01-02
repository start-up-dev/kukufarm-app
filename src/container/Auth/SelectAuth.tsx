import React, {FC} from 'react';
import Layout from 'components/Layout';
import {IScreenProps} from 'interfaces/INavigation';
import {ScrollView, StatusBar, StyleSheet, View} from 'react-native';
import {theme} from 'styles/theme';
import Text from 'components/Text';
import Space from 'components/Space';
import {Icons} from 'icon/icons';
import Container from 'components/Container';
import Flex from 'components/Flex';
import {AuthStackParamList} from '.';
import {statusbarHeight} from 'utils/helper';
import {isIos} from 'utils/conditions';
import BackButton from 'components/Back';
import Input from 'components/Input';
import Button from 'components/Button';
import FastImage from 'react-native-fast-image';
import logo from 'assets/images/logo_updated.png';
import {navigationRef} from 'utils/navigation';

type IProps = IScreenProps<AuthStackParamList, 'GetStarted'>;

const SelectAuth: FC<IProps> = ({}) => {
  return (
    <Layout
      noSpace
      statusbarColor="black"
      darkStatusbar
      translucent={false}
      safeArea>
      <Container
        style={{
          justifyContent: 'center',
          backgroundColor: theme.colors.white,
          flex: 1,
          padding: theme.size.pageBorder + 5,
        }}>
        {/* {isIos && <Space height={statusbarHeight} />} */}
        {/* <Flex justify="flex-start" align="flex-end">
          <BackButton dark title="" />
        </Flex> */}

        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {/* <Text size={30}>Input Your Name</Text> */}
          <FastImage style={{width: '80%', height: 120}} source={logo} />
          <Space height={1} />
          <Text size={24} style={{fontWeight: '600'}}>
            Daily Wellness Check In
          </Text>
          <Space height={80} />
          <Button
            rounded
            sm
            block
            onPress={() =>
              navigationRef.navigate('AuthStack', {
                screen: 'SignUp',
              })
            }>
            Sign Up
          </Button>
          <Space height={15} />

          <View style={{flexDirection: 'row'}}>
            <Text size={17}>Already have an account. </Text>
            <Text
              size={17}
              bold
              primary
              onPress={() =>
                navigationRef.navigate('AuthStack', {
                  screen: 'SignIn',
                })
              }>
              Log In{' '}
            </Text>
          </View>
        </View>
      </Container>
    </Layout>
  );
};

export default SelectAuth;
