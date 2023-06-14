import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Record from './Record';
import RecordDetailsScreen from './RecordDetailsScreen';
import Header from 'components/common/Header';

export type RecordStackParamList = {
  Record: undefined;
  RecordDetails: undefined;
};

const Stack = createNativeStackNavigator<RecordStackParamList>();

const ChatStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Record"
      screenOptions={{animation: 'slide_from_left'}}>
      <Stack.Screen
        name="Record"
        component={Record}
        options={{header: () => <Header title="Flock Record" back empty />}}
      />
      <Stack.Screen
        name="RecordDetails"
        component={RecordDetailsScreen}
        options={{
          header: () => <Header title="C1 - All flocks" back record empty />,
        }}
      />
    </Stack.Navigator>
  );
};

export default ChatStack;
