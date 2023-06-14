import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {persistor, store} from './src/store';
import {Provider} from 'react-redux';
import RootNavigation from './src/container';
// import 'react-native-gesture-handler';
// import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {PersistGate} from 'redux-persist/integration/react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {navigationRef} from 'utils/navigation';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {AlertInitializer} from './src/utils/toast';
import RootLoader from './src/components/RootLoader';
import codePush from 'react-native-code-push';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import {
  NotificationListener,
  requestUserPermission,
} from './src/utils/pushNotificationHelper';

import ForegroundHandler from './src/utils/ForegroundPushNotification';
let codePushOptions = {checkFrequency: codePush.CheckFrequency.ON_APP_START};
import linking from 'utils/linking';

GoogleSignin.configure({
  webClientId:
    '693246696932-giabagvkjh0o9tv9eq9eelomr6o52ge2.apps.googleusercontent.com',
  iosClientId:
    '693246696932-q9c3lcph74l2jgi9hj3frp38hb9ji7os.apps.googleusercontent.com',

  offlineAccess: true,
});

const App = () => {
  useEffect(() => {
    // enableLatestRenderer();
    main();

    dynamicLinks()
      .getInitialLink()
      .then(link => {
        handleDynamicLink(link);
      });
    const linkingListener = dynamicLinks().onLink(handleDynamicLink);
    return () => linkingListener();
  }, []);

  const handleDynamicLink = link => {
    if (!!link?.url) {
      let getId = link.url?.split('=').pop();
      navigationRef.navigate('OtherStack', {
        screen: 'Stream',
        params: {
          stream: {streamId: getId},
        },
      });
    }
  };

  const main = async () => {
    codePush.sync({
      updateDialog: true,
      installMode: codePush.InstallMode.IMMEDIATE,
    });

    requestUserPermission();
    NotificationListener();
    ForegroundHandler();
  };

  return (
    <SafeAreaProvider>
      {/* <GestureHandlerRootView style={{flex: 1}}> */}
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RootLoader />
          <BottomSheetModalProvider>
            <NavigationContainer ref={navigationRef} linking={linking}>
              <RootNavigation />
            </NavigationContainer>
          </BottomSheetModalProvider>
          <AlertInitializer />
        </PersistGate>
      </Provider>
      {/* </GestureHandlerRootView> */}
    </SafeAreaProvider>
  );
};

// export default codePush(codePushOptions)(App);
export default codePush(codePushOptions)(App);
