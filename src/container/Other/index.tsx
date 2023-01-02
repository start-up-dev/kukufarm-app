import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import UpdateName from './UpdateName';
import UpdatePhone from './UpdatePhone';
import Subscription from './Subscription';
import SetProfileImage from './SetProfileImage';
import PhoneOtpVerify from './PhoneOtpVerify';
import ManuallyAddContact from './ManuallyAddContact';
import Contacts from './Contacts';
import TrackList from './TrackList';
import AccountDelete from './AccountDelete';

export type OtherStackParamList = {
  UpdateName: {isFromSignUp?: boolean};
  UpdatePhone: {isFromSignUp?: boolean};
  Subscription: {isTutorialStep?: boolean};
  SetProfileImage: {isFromSignUp?: boolean};
  PhoneOtpVerify: {phone: string; isFromSignUp?: boolean};
  ManuallyAddContact: {circleId: string};
  Contacts: {circleId: string};
  TrackList: {trackId: string};
  AccountDelete: undefined;
};

const Stack = createNativeStackNavigator<OtherStackParamList>();

const AuthNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="UpdateName">
      <Stack.Screen
        name="UpdateName"
        component={UpdateName}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="UpdatePhone"
        component={UpdatePhone}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Subscription"
        component={Subscription}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SetProfileImage"
        component={SetProfileImage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PhoneOtpVerify"
        component={PhoneOtpVerify}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ManuallyAddContact"
        component={ManuallyAddContact}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Contacts"
        component={Contacts}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TrackList"
        component={TrackList}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AccountDelete"
        component={AccountDelete}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
