import React, {useEffect} from 'react';
import {StatusBar, View} from 'react-native';
import {useCustomDispatch, useCustomSelector} from 'store';

import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from 'container';

import curveLoading from 'assets/images/curve_loading.png';
import Image from 'components/Image';
import Text from 'components/Text';

import Space from 'components/Space';

// import ScaleLogo from 'components/splash/ScaleLogo';
import {get_my_profile} from 'api/auth';
import {setAuthStore} from 'store/reducers/auth';
import {theme} from 'styles/theme';
import logo from 'assets/images/logo_updated_light.png';
import FastImage from 'react-native-fast-image';
import {Tutorial} from 'interfaces/IConfig';
import {navigationRef} from 'utils/navigation';
import {updateTutorialStep} from 'store/reducers/tutorial';

type ISplashNavigator = NavigationProp<RootStackParamList, 'SplashStack'>;

const Splash = ({}) => {
  const {token} = useCustomSelector(state => state.auth);
  const {step} = useCustomSelector(state => state.tutorial);
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
    if (step !== Tutorial.FINISHED) {
      //  navigationRef.navigate('TutorialStack');

      navigation.reset({
        routes: [{name: 'TutorialStack'}],
      });
      return;
    }
    if (token) {
      getMyProfile();
      navigation.reset({
        routes: [{name: 'HomeStack'}],
      });
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
          <FastImage
            style={{position: 'absolute', width: '80%', height: 120}}
            source={logo}
          />
          <View style={{position: 'absolute', alignItems: 'center'}}>
            <Space height={17} />
          </View>
          <View
            style={{
              flex: 1,
              width: '100%',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}>
            <Image size={120} source={curveLoading} />
          </View>
          <Space height={100} />
        </View>
      </View>
    </>
  );
};

export default Splash;
