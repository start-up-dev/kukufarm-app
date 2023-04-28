import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RecordScreen from "../screens/RecordScreen";
import RecordDetailsScreen from "../screens/RecordDetailsScreen";
import Header from "../components/common/Header";

const Stack = createNativeStackNavigator();

const RecordStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Record"
      screenOptions={{ animation: "slide_from_left" }}
    >
      <Stack.Screen
        name="Record"
        component={RecordScreen}
        options={{ header: () => <Header title="Flock Record" /> }}
      />
      <Stack.Screen
        name="Record Details"
        component={RecordDetailsScreen}
        options={{
          header: () => <Header title="C1 - All flocks" back record />,
        }}
      />
    </Stack.Navigator>
  );
};

export default RecordStack;
