import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import MainStack from "./src/navigation";
import Loader from "./src/components/common/Loader";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Sora-Regular": require("./assets/fonts/Sora-Regular.ttf"),
    "Sora-SemiBold": require("./assets/fonts/Sora-SemiBold.ttf"),
    "Sora-Bold": require("./assets/fonts/Sora-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <Loader visible={true} />;
  }

  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
}
