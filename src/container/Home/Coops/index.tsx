import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Coops from './Coops';
import FarmUser from './FarmUser';
import ArchivedScreen from './ArchivedScreen';
import SingleCoopScreen from './SingleCoopScreen';
import FlockDetailsScreen from './FlockDetailsScreen';
import CoopsHeader from 'components/coops/CoopsHeader';
import {useCustomSelector} from 'store';
import Header from 'components/common/Header';

export type CoopStackParamList = {
  Coops: undefined;
  FarmUser: undefined;
  Archive: undefined;
  SingleCoop: undefined;
  FlockDetails: undefined;
};

const Stack = createNativeStackNavigator<CoopStackParamList>();

const ChatStack = () => {
  const userData = useCustomSelector(state => state.auth.userData);

  return (
    <Stack.Navigator
      initialRouteName="Coops"
      screenOptions={{animation: 'slide_from_left'}}>
      <Stack.Screen
        name="Coops"
        component={Coops}
        options={{header: () => <CoopsHeader />}}
      />
      <Stack.Screen
        name="FarmUser"
        component={FarmUser}
        options={{headerShown: false}}
        options={{
          header: () => (
            <Header title={`${userData?.firstName}'s Farm`} back empty />
          ),
        }}
      />
      <Stack.Screen
        name="Archive"
        component={ArchivedScreen}
        options={{
          header: () => <Header title="Archived flocks" back empty />,
        }}
      />
      <Stack.Screen
        name="SingleCoop"
        component={SingleCoopScreen}
        options={{
          header: () => <Header title="Coop 1" back empty />,
        }}
      />
      <Stack.Screen
        name="FlockDetails"
        component={FlockDetailsScreen}
        // options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default ChatStack;
