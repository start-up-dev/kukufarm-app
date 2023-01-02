import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from './Splash';
import HomeStack, {HomeStackParamList} from './Home';
import AuthStack, {AuthStackParamList} from './Auth';
import OtherStack, {OtherStackParamList} from './Other';
import TutorialStack, {TutorialStackParamList} from './Tutorial';
import {NavigatorScreenParams} from '@react-navigation/native';

import {useCustomDispatch, useCustomSelector} from 'store';
import {Tutorial} from 'interfaces/IConfig';
import {navigationRef} from 'utils/navigation';

export type RootStackParamList = {
  SplashStack: undefined;
  HomeStack: NavigatorScreenParams<HomeStackParamList>;
  AuthStack: NavigatorScreenParams<AuthStackParamList>;
  OtherStack: NavigatorScreenParams<OtherStackParamList>;
  TutorialStack: NavigatorScreenParams<TutorialStackParamList>;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigation = () => {
  // useSocketConnect();
  // const socket = useCustomSelector(state => state.socket.socket);
  // const {AGORA_APP_ID} = useCustomSelector(state => state.config.config);
  // console.log(AGORA_APP_ID);

  // const dispatch = useCustomDispatch();

  // useEffect(() => {
  //   dispatch(getConfig());
  // }, []);

  // useEffect(() => {
  //   socket?.on('ON_APP_ID_CHANGED', (appId: any) => {
  //     console.log('I M CONNECTED in index.js ON_APP_ID_CHANGED', appId);
  //     dispatch(updateConfig({AGORA_APP_ID: appId}));
  //   });

  //   // return () => {
  //   //   console.log('I M DISCONNECT ON_APP_ID_CHANGED ');
  //   //   // socket?.off('ON_APP_ID_CHANGED');
  //   // };
  // }, [socket]);

  const {step} = useCustomSelector(state => state.tutorial);
  console.log(step);

  useEffect(() => {
    if (step === Tutorial.FINISHED) {
      return;
    } else if (step === Tutorial.EMERGENCY_CONTACT) {
      navigationRef.navigate('TutorialStack', {
        screen: 'Emergency',
        params: {isTutorial: true},
      });
    } else if (step === Tutorial.ADD_EMERGENCY) {
      navigationRef.navigate('TutorialStack', {
        screen: 'Contacts',
        params: {isTutorial: true},
      });
    } else if (step === Tutorial.SET_CHECK_IN_TIME) {
      navigationRef.navigate('TutorialStack', {
        screen: 'Checkin',
        params: {isTutorial: true, setCheckInTime: true},
      });
    } else if (step === Tutorial.DO_CHECK_IN) {
      navigationRef.navigate('TutorialStack', {
        screen: 'Checkin',
        params: {isTutorial: true, doCheckIn: true},
      });
    } else if (step === Tutorial.EMERGENCY_ALERT_SOS) {
      navigationRef.navigate('TutorialStack', {
        screen: 'Checkin',
        params: {isTutorial: true, isSos: true},
      });
    }
  }, [step]);

  return (
    <Stack.Navigator initialRouteName="SplashStack">
      <Stack.Screen
        name="SplashStack"
        component={Splash}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AuthStack"
        component={AuthStack}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="TutorialStack"
        component={TutorialStack}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="HomeStack"
        component={HomeStack}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="OtherStack"
        component={OtherStack}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default RootNavigation;
