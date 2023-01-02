import {Linking, Platform} from 'react-native';
import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';

const config = {
  //   initialRouteName: 'Main',
  screens: {
    SplashStack: 'splash',
    OtherStack: {
      screens: {
        Stream: {
          path: 'stream/:streamId',
          parse: {
            streamId: (streamId: string) => streamId,
          },
        },
      },
    },
  },
};

const linking = {
  prefixes: [
    'heartlive://',
    'https://heartlive.page.link',
    'http://heartlive.page.link',
  ],
  config,
  async getInitialURL() {
    // // Check if app was opened from a deep link
    // const url = await Linking.getInitialURL();
    // if (url != null) {
    //   return url;
    // }

    // // Check if there is an initial firebase notification

    // // Get deep link from data
    // // if this is undefined, the app will open the default/home page

    // return url?.data?.link;

    // check for notification deep linking
    PushNotification.popInitialNotification(notification => {
      // <---- 1
      if (notification) {
        const {link = null} = notification?.data || {};
        return link; // <---- 2
      }
    });

    // this is the default return
    return Linking.getInitialURL();
  },
  subscribe(listener: any) {
    const onReceiveURL = ({url}: {url: any}) => listener(url);

    // Listen to incoming links from deep linking

    Linking.addEventListener('url', onReceiveURL);

    // Listen to firebase push notifications

    const unsubscribeNotification = messaging().onNotificationOpenedApp(
      message => {
        const url = message?.data?.link;
        if (url) {
          // Any custom logic to check whether the URL needs to be handled
          // Call the listener to let React Navigation handle the URL
          listener(url);
        }
      },
    );

    return () => {
      // Clean up the event listeners
      Linking.remove('url', onReceiveURL);
      unsubscribeNotification();
    };
  },
};

export default linking;
