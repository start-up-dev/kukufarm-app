import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Settings from './Settings';
import Header from 'components/common/Header';

export type ProfileStackParamList = {
  Settings: undefined;
};

const Stack = createNativeStackNavigator<ProfileStackParamList>();

const ChatStack = () => {
  return (
    <Stack.Navigator initialRouteName="Settings">
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{
          header: () => <Header title="Settings" back empty />,
        }}
      />
    </Stack.Navigator>
  );
};

export default ChatStack;
