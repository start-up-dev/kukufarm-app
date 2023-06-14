import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from './Splash';
import HomeStack, {HomeStackParamList} from './Home';
import AuthStack, {AuthStackParamList} from './Auth';
import OtherStack, {OtherStackParamList} from './Other';

import {NavigatorScreenParams} from '@react-navigation/native';

export type RootStackParamList = {
  SplashStack: undefined;
  HomeStack: NavigatorScreenParams<HomeStackParamList>;
  AuthStack: NavigatorScreenParams<AuthStackParamList>;
  OtherStack: NavigatorScreenParams<OtherStackParamList>;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigation = () => {
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
