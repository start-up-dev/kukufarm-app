import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// import Initial from './Initial';
import Emergency from '../Home/Emergency/Emergency';
import Contacts from '../Other/Contacts';
import Checkin from '../Home/Checkin/Checkin';

export type TutorialStackParamList = {
  Initial: undefined;
  Emergency: {isTutorial: boolean} | undefined;
  Contacts: {isTutorial: boolean} | undefined;
  Checkin:
    | {
        isTutorial: boolean;
        setCheckInTime?: boolean;
        doCheckIn?: boolean;
        isSos?: boolean;
      }
    | undefined;
};

const Stack = createNativeStackNavigator<TutorialStackParamList>();

const AuthNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Emergency">
      {/* <Stack.Screen
        name="Initial"
        component={Initial}
        options={{headerShown: false}}
      /> */}
      <Stack.Screen
        name="Emergency"
        component={Emergency}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Contacts"
        component={Contacts}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Checkin"
        component={Checkin}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
