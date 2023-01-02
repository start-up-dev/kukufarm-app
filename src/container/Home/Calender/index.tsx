import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Calender from './Calender';

export type CalenderStackParamList = {
  Calender: undefined;
};

const Stack = createNativeStackNavigator<CalenderStackParamList>();

const ChatStack = () => {
  return (
    <Stack.Navigator initialRouteName="Calender">
      <Stack.Screen
        name="Calender"
        component={Calender}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default ChatStack;
