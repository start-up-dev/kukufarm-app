import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTab from "./BottomTab";
import LogInScreen from "../screens/LogInScreen";
import Header from "../components/common/Header";
import ProfileScreen from "../screens/settings/ProfileScreen";
import EditProfileScreen from "../screens/settings/EditProfileScreen";
import AddFlockScreen from "../screens/coops/AddFlockScreen";

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
        name="Log In"
        component={LogInScreen}
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
    </Stack.Navigator>
  );
};

export default MainStack;
