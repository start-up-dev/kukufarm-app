import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Header from "../components/common/Header";
import RecordScreen from "../screens/records/RecordScreen";
import RecordDetailsScreen from "../screens/records/RecordDetailsScreen";

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
        options={{ header: () => <Header title="Flock Record" back empty /> }}
      />
      <Stack.Screen
        name="Record Details"
        component={RecordDetailsScreen}
        options={{
          header: () => <Header title="C1 - All flocks" back record empty />,
        }}
      />
    </Stack.Navigator>
  );
};

export default RecordStack;
