export const APP_NAME = 'Just Checking In';

// export const SERVER_URL = "http://192.168.48.1:5001/just-checking-in-bitrupt/us-central1";
// export const SERVER_URL = "http://192.168.48.1:3000";
// export const SERVER_URL = "http://34.66.148.218";
// Prev
export const SERVER_URL =
  'https://us-central1-just-checking-in-bitrupt.cloudfunctions.net/api';
// export const SERVER_URL =
//   'https://us-central1-just-checking-in-intl-22.cloudfunctions.net/api';

export const MIN_PASSWORD_LEN = 6;
export const PHONE_CODE_COUNT = 6;
export const MAX_EMERGENCY_CONTACT = 3;

export const DURATION_TOAST = 4000;

export const CONFIGURATIONS = [
  {
    key: 'checkInAlerts',
    icon: 'alert-circle-outline',
    text: 'Check In Alerts',
  },
  {
    key: 'emailAlerts',
    icon: 'mail-unread-outline',
    text: 'Email Alerts',
  },
  {
    key: 'smsAlerts',
    icon: 'chatbox-ellipses-outline',
    text: 'SMS Alerts',
  },
  {
    key: 'vacationMode',
    icon: 'airplane-outline',
    text: 'Vacation Mode',
  },
  {
    key: 'checkInMode',
    icon: 'stopwatch-outline',
    text: '24 Hour Countdown Mode ',
  },
];

export const NOTIFICATIONS = {
  CHECKIN: 0,
  CHECKIN_TIME: 1,
  CHECKIN_DELAY: 2,
  EMERGENCY: 3,
  SHARE: 4,
};

export const ONESIGNAL_API_ID = 'd247de9f-9648-42c9-8c85-42021c03f420';

export const IAP_SHARED_SECRET = '48064b5a30af4af99050f0f6579bb782';
export const IAP_IS_PRODUCTION = true;

export const TUTORIAL = {
  None: -1,
  Ready: 0,
  Emergency: 1,
  CheckIn1: 2,
  CheckIn2: 3,
  Status: 4,
  CheckIn3: 5,
  CheckIn4: 6,
  Profile: 7,
  AddEmergency: 8,
  CheckEmergency: 9,
  ShareCheckIn: 10,
};

export const TOAST_DURATION_TUTORIAL = 4000;

export const PACKAGE_NAME = 'com.makereal.kukufarm';
