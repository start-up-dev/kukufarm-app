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
import { useSelector } from "react-redux";

const Stack = createNativeStackNavigator();

const CoopStack = () => {
  const userData = useSelector((state) => state.auth.userData);
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
        name="Single Coop"
        component={SingleCoopScreen}
        options={{
          header: () => <Header title="Coop 1" back empty />,
        }}
      />
      <Stack.Screen name="Flock Details" component={FlockDetailsScreen} />
    </Stack.Navigator>
  );
};

export default CoopStack;
