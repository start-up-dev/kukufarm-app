import React, {useEffect} from 'react';
import {StatusBar, View} from 'react-native';
import {useCustomDispatch, useCustomSelector} from 'store';

import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from 'container';

import {get_my_profile} from 'api/auth';
import {setAuthStore} from 'store/reducers/auth';
import {theme} from 'styles/theme';
import splash from 'assets/splash.png';
import FastImage from 'react-native-fast-image';

type ISplashNavigator = NavigationProp<RootStackParamList, 'SplashStack'>;

const Splash = ({}) => {
  const {token} = useCustomSelector(state => state.auth);

  const navigation = useNavigation<ISplashNavigator>();
  const dispatch = useCustomDispatch();

  const getMyProfile = async () => {
    try {
      const {data} = await get_my_profile();
      dispatch(
        setAuthStore({
          userData: data.user,
        }),
      );
    } catch (error) {
      console.log(error);
    }
  };

  const checkToken = async () => {
    if (token) {
      navigation.reset({
        routes: [{name: 'HomeStack'}],
      });
      getMyProfile();
    } else {
      navigation.reset({
        routes: [{name: 'AuthStack'}],
      });
    }
  };

  useEffect(() => {
    // AsyncStorage.clear()
    checkToken();
    // dispatch(updateTutorialStep(Tutorial.EMERGENCY_CONTACT));
  }, []);

  return (
    <>
      <View style={{flex: 1, backgroundColor: theme.colors.primary}}>
        <StatusBar backgroundColor="transparent" translucent={true} />
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <FastImage style={{width: '100%', height: '100%'}} source={splash} />
        </View>
      </View>
    </>
  );
};

export default Splash;
