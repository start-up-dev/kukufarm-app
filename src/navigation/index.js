import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTab from "./BottomTab";
import LogInScreen from "../screens/LogInScreen";
import Header from "../components/common/Header";
import ProfileScreen from "../screens/settings/ProfileScreen";
import EditProfileScreen from "../screens/settings/EditProfileScreen";
import AddFlockScreen from "../screens/coops/AddFlockScreen";
import AddPeopleSreen from "../screens/coops/AddPeopleScreen";
import UpgradeScreen from "../screens/settings/UpgradeScreen";
import EggsTrayScreen from "../screens/settings/EggsTrayScreen";
import CurrencyScreen from "../screens/settings/CurrencyScreen";
import SplitScreen from "../screens/coops/SplitScreen";
import AddBirdScreen from "../screens/coops/AddBirdsScreen";
import RemoveBirdScreen from "../screens/coops/RemoveBirdScreen";
import AddExpenseScreen from "../screens/records/AddExpenseScreen";

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Bottom Tab"
      screenOptions={{ animation: "slide_from_left" }}
    >
      <Stack.Screen
        name="Bottom Tab"
        component={BottomTab}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          header: () => <Header title="Profile" back edit />,
        }}
      />
      <Stack.Screen
        name="Edit Profile"
        component={EditProfileScreen}
        options={{
          header: () => <Header title="Edit Profile" cancel save />,
        }}
      />
      <Stack.Screen
        name="Add Flock"
        component={AddFlockScreen}
        options={{
          header: () => <Header title="New Flock" cancel save />,
        }}
      />
      <Stack.Screen
        name="Add People"
        component={AddPeopleSreen}
        options={{
          header: () => <Header title="Add People" cancel save />,
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
        name="Eggs Tray"
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
      <Stack.Screen
        name="Split"
        component={SplitScreen}
        options={{
          header: () => <Header title="Split flock" cancel save />,
        }}
      />
      <Stack.Screen
        name="Add Bird"
        component={AddBirdScreen}
        options={{
          header: () => <Header title="Add birds" cancel save />,
        }}
      />
      <Stack.Screen
        name="Remove Bird"
        component={RemoveBirdScreen}
        options={{
          header: () => <Header title="Remove birds" cancel save />,
        }}
      />
      <Stack.Screen
        name="Add Expense"
        component={AddExpenseScreen}
        options={{
          header: () => <Header title="Add Expense" cancel save />,
        }}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
