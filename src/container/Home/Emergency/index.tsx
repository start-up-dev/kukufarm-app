import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Emergency from './Emergency';

export type EmergencyStackParamList = {
  Emergency: undefined;
};

const Stack = createNativeStackNavigator<EmergencyStackParamList>();

const ChatStack = () => {
  return (
    <Stack.Navigator initialRouteName="Emergency">
      <Stack.Screen
        name="Emergency"
        component={Emergency}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default ChatStack;
