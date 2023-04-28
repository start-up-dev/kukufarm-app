import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { useCallback, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";

import LogInScreen from "./src/screens/LogInScreen";
import MainStack from "./src/navigation";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync({
          "Sora-Regular": require("./assets/fonts/Sora-Regular.ttf"),
          "Sora-SemiBold": require("./assets/fonts/Sora-SemiBold.ttf"),
          "Sora-Bold": require("./assets/fonts/Sora-Bold.ttf"),
        });

        console.log("1");
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);
  console.log(appIsReady);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      console.log("2");

      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <NavigationContainer onLayout={onLayoutRootView()}>
      <MainStack />
    </NavigationContainer>
  );
}
