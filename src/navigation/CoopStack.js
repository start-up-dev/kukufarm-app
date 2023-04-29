import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Header from "../components/common/Header";
import RecordScreen from "../screens/records/RecordScreen";
import RecordDetailsScreen from "../screens/records/RecordDetailsScreen";
import CoopScreen from "../screens/coops/CoopScreen";
import FarmUser from "../screens/coops/FarmUser";
import CoopsHeader from "../components/coops/CoopsHeader";
import ArchivedScreen from "../screens/coops/ArchivedScreen";
import SingleCoopScreen from "../screens/coops/SingleCoopScreen";
import FlockDetailsScreen from "../screens/coops/FlockDetailsScreen";

const Stack = createNativeStackNavigator();

const CoopStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Coop"
      screenOptions={{ animation: "slide_from_left" }}
    >
      <Stack.Screen
        name="Coop"
        component={CoopScreen}
        options={{ header: () => <CoopsHeader /> }}
      />
      <Stack.Screen
        name="Farm User"
        component={FarmUser}
        options={{
          header: () => <Header title="John's Farm" back />,
        }}
      />
      <Stack.Screen
        name="Archive"
        component={ArchivedScreen}
        options={{
          header: () => <Header title="Archived flocks" back />,
        }}
      />
      <Stack.Screen
        name="Single Coop"
        component={SingleCoopScreen}
        options={{
          header: () => <Header title="Coop 1" back deleted />,
        }}
      />
      <Stack.Screen
        name="Flock Details"
        component={FlockDetailsScreen}
        options={{
          header: () => <Header title="C1 Kienyeji 1 Mixed" back dot />,
        }}
      />
    </Stack.Navigator>
  );
};

export default CoopStack;
