import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Status from './Status';

export type StatusStackParamList = {
  Status: undefined;
};

const Stack = createNativeStackNavigator<StatusStackParamList>();

const ChatStack = () => {
  return (
    <Stack.Navigator initialRouteName="Status">
      <Stack.Screen
        name="Status"
        component={Status}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default ChatStack;
