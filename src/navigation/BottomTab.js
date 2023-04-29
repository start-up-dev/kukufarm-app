import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import RecordScreen from "../screens/records/RecordScreen";
import SettingsScreen from "../screens/settings/SettingsScreen";
import { Image } from "react-native";
import color from "../const/color";
import Header from "../components/common/Header";
import CoopsHeader from "../components/coops/CoopsHeader";
import RecordStack from "./RecordStack";
import CoopScreen from "../screens/coops/CoopScreen";
import CoopStack from "./CoopStack";
import SettingStack from "./SettingStack";

//Component

const Tab = createBottomTabNavigator();

const coops = require("../../assets/images/coops.png");
const coopsActive = require("../../assets/images/coopsActive.png");
const records = require("../../assets/images/records.png");
const recordsActive = require("../../assets/images/recordsActive.png");
const settings = require("../../assets/images/settings.png");
const settingsActive = require("../../assets/images/settingsActive.png");

const BottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName, iconColor;

          switch (route.name) {
            case "Coops":
              iconName = focused ? coopsActive : coops;
              break;
            case "Records":
              iconName = focused ? recordsActive : records;
              break;
            case "Settings":
              iconName = focused ? settingsActive : settings;
              break;
          }

          return (
            <Image
              source={iconName}
              style={{ width: 20, height: 20, resizeMode: "contain" }}
            />
          );
        },
        tabBarActiveTintColor: color.TextLink,
        tabBarInactiveTintColor: "#6F6F78",
        tabBarLabelStyle: {
          fontSize: 10,
          fontFamily: "Sora-SemiBold",
        },
      })}
      initialRouteName="Coops"
    >
      <Tab.Screen
        name="Coops"
        component={CoopStack}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Records"
        component={RecordStack}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingStack}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
