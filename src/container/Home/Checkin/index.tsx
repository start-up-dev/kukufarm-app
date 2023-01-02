import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Checkin from './Checkin';

export type CheckinStackParamList = {
  Checkin: undefined;
};

const Stack = createNativeStackNavigator<CheckinStackParamList>();

const ChatStack = () => {
  return (
    <Stack.Navigator initialRouteName="Checkin">
      <Stack.Screen
        name="Checkin"
        component={Checkin}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default ChatStack;
