import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Header from "../components/common/Header";
import RecordScreen from "../screens/records/RecordScreen";
import RecordDetailsScreen from "../screens/records/RecordDetailsScreen";
import SettingsScreen from "../screens/settings/SettingsScreen";
import ProfileScreen from "../screens/settings/ProfileScreen";

const Stack = createNativeStackNavigator();

const SettingStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Setting"
      screenOptions={{ animation: "slide_from_left" }}
    >
      <Stack.Screen
        name="Setting"
        component={SettingsScreen}
        options={{ header: () => <Header title="Settings" back empty /> }}
      />
      {/* <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          header: () => <Header title="Profile" back edit />,
        }}
      /> */}
    </Stack.Navigator>
  );
};

export default SettingStack;
