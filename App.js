import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import MainStack from "./src/navigation";
import Loader from "./src/components/common/Loader";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./src/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { logIn } from "./src/store/authSlice";
import BottomTab from "./src/navigation/BottomTab";
import LogInScreen from "./src/screens/LogInScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthStack from "./src/navigation/AuthStack";
import { getMe } from "./src/api/auth";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}

const Main = () => {
  const isloggedIn = useSelector((state) => state.auth.loggedIn);
  // const userData = useSelector((state) => state.auth.userData);

  const dispatch = useDispatch();

  const [fontsLoaded] = useFonts({
    "Sora-Regular": require("./assets/fonts/Sora-Regular.ttf"),
    "Sora-SemiBold": require("./assets/fonts/Sora-SemiBold.ttf"),
    "Sora-Bold": require("./assets/fonts/Sora-Bold.ttf"),
  });

  useEffect(() => {
    const logInUser = async () => {
      const value = await AsyncStorage.getItem("TOKEN");
      if (value) {
        dispatch(logIn());
        dispatch(getMe());
      }
    };
    logInUser();
  });

  if (!fontsLoaded) {
    return <Loader visible={true} />;
  }

  return (
    <NavigationContainer>
      {isloggedIn ? <MainStack initialRoute={"Bottom Tab"} /> : <AuthStack />}
    </NavigationContainer>
  );
};
