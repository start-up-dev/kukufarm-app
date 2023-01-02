import React, {useEffect} from 'react';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';
import {Linking, Platform} from 'react-native';
// import { store } from "../redux/store";

const ForegroundHandler = () => {
  const type = 'notification';
  const subscribe = messaging().onMessage(async remoteMessage => {
    console.log('Notification on foreground state...', remoteMessage);
    const {notification, messageId, data} = remoteMessage;

    // const role = store.getState()?.user?.profile?.profile?.role;
    // console.log('====================================');
    // console.log(conversationId, data);
    // console.log('====================================');
    // if (conversationId && conversationId.toString() === data?.conversationId)
    //   return;
    if (Platform.OS === 'ios') {
      PushNotificationIOS.addNotificationRequest({
        id: messageId,
        body: notification?.body,
        title: notification?.title,
        sound: 'default',
      });

      const onRemoteNotification = notification => {
        const isClicked = notification.getData().userInteraction === 1;
        if (isClicked) {
          // Navigate user to another screen
          if (notification?.data?.link) {
            Linking.openURL(notification?.data?.link);
          }
        } else {
          // Do something else with push notification
        }
      };

      PushNotificationIOS.addEventListener(type, onRemoteNotification);
    } else {
      PushNotification.localNotification({
        channelId: 'HeartLive',
        // autoCancel: true,
        // id: messageId,
        // body: notification.body,
        title: notification?.title,
        // soundName: 'default',
        // vibrate: true,
        // playSound: true,
        // actions: '["Yes", "No"]',
        autoCancel: true,
        bigText: notification?.body || '',
        subText: notification?.subText || '',
        // title: 'Local Notification Title',
        message: notification?.body || '',
        vibrate: true,
        vibration: 300,
        playSound: true,
        soundName: 'default',
        // actions: '["Yes", "No"]',
        priority: 'high',
      });

      PushNotification.configure({
        onNotification: function (notification) {
          const {link = null} = data || {}; // <---- 1
          link && Linking.openURL(link); // <---- 2
          notification.finish(PushNotificationIOS.FetchResult.NoData);
        },
        popInitialNotification: true,
      });
    }
  });

  return () => {
    PushNotificationIOS.removeEventListener(type);
    subscribe;
  };
};

export default ForegroundHandler;
