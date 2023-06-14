import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Header from 'components/common/Header';

import ProfileScreen from './ProfileScreen';
import EditProfileScreen from './EditProfileScreen';
import AddFlockScreen from './AddFlockScreen';
import AddPeopleScreen from './AddPeopleScreen';
import UpgradeScreen from './UpgradeScreen';
import EggsTrayScreen from './EggsTrayScreen';
import CurrencyScreen from './CurrencyScreen';
import SplitScreen from './SplitScreen';
import AddBirdsScreen from './AddBirdsScreen';
import RemoveBirdScreen from './RemoveBirdScreen';
import AddExpenseScreen from './AddExpenseScreen';

export type OtherStackParamList = {
  Profile: undefined;
  EditProfile: undefined;
  AddFlock: undefined;
  AddPeople: undefined;
  Upgrade: undefined;
  EggsTray: undefined;
  Currency: undefined;
  Split: undefined;
  AddBird: undefined;
  RemoveBird: undefined;
  AddExpense: undefined;
};

const Stack = createNativeStackNavigator<OtherStackParamList>();

const AuthNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Profile">
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          header: () => <Header title="Profile" back edit />,
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        // options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddFlock"
        component={AddFlockScreen}
        // options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddPeople"
        component={AddPeopleScreen}
        options={{
          header: () => <Header title="Add People" cancel empty />,
        }}
      />
      <Stack.Screen
        name="Upgrade"
        component={UpgradeScreen}
        options={{
          header: () => <Header title="Upgrade" back empty />,
        }}
      />
      <Stack.Screen
        name="EggsTray"
        component={EggsTrayScreen}
        options={{
          header: () => <Header title="Eggs per tray" cancel save />,
        }}
      />
      <Stack.Screen
        name="Currency"
        component={CurrencyScreen}
        options={{
          header: () => <Header title="Default currency" cancel save />,
        }}
      />
      <Stack.Screen name="Split" component={SplitScreen} />
      <Stack.Screen name="AddBird" component={AddBirdsScreen} />
      <Stack.Screen name="RemoveBird" component={RemoveBirdScreen} />
      <Stack.Screen
        name="AddExpense"
        component={AddExpenseScreen}
        options={{
          header: () => <Header title="Add Expense" cancel save />,
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
