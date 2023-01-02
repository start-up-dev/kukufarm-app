import moment from 'moment';

export const to12hClock = (hour: number) => {
  return hour > 12 ? hour - 12 : hour;
};

export const getTime = () => {
  const date = new Date();
  const hours = (to12hClock(date.getHours()) / 12) * 360;
  const minutes = (date.getMinutes() / 60) * 360;
  const seconds = (date.getSeconds() / 60) * 360;
  return {hours, minutes, seconds};
};

export const getDateTimeInAngles = (dateTime: number) => {
  const hours = (to12hClock(dateTime.getHours()) / 12) * 360;
  const minutes = (dateTime.getMinutes() / 60) * 360;
  const seconds = (dateTime.getSeconds() / 60) * 360;
  return {hours, minutes, seconds};
};

export const SEC_ONE_DAY = 24 * 60 * 60;
export const MSEC_ONE_DAY = 24 * 60 * 60 * 1000;
export const MSEC_ONE_HOUR = 60 * 60 * 1000;
export const VALUE_CHECKIN_RED = 1 / 24;
export const MSEC_TRIAL_PERIOD = 0 * MSEC_ONE_DAY;

// Calculate time diff in SECOND unit. time1 < time2
export function getTimeDiff(time1, time2) {
  if (time1 > 1000000000000) {
    time1 = Math.round(time1 / 1000);
    time2 = Math.round(time2 / 1000);
  }
  let diff = time2 - time1;
  if (diff < 0) diff = diff + Math.round(diff / SEC_ONE_DAY) * SEC_ONE_DAY;
  if (diff > 0) diff = diff - Math.round(diff / SEC_ONE_DAY) * SEC_ONE_DAY;

  while (diff <= 0) diff += SEC_ONE_DAY;
  while (diff > SEC_ONE_DAY) diff -= SEC_ONE_DAY;

  return diff;
}

export function getNextCheckInTime(time, lastCheckInTime) {
  const curTime = Date.now();
  const diff = getTimeDiff(curTime, time) * 1000;
  const nextTime = diff + curTime;
  const prevTime = nextTime - MSEC_ONE_DAY;

  if (lastCheckInTime > prevTime && lastCheckInTime - prevTime < MSEC_ONE_HOUR)
    return nextTime;
  if (prevTime > lastCheckInTime - MSEC_ONE_HOUR) return prevTime;
  if (prevTime < curTime && curTime < prevTime + MSEC_ONE_HOUR) return prevTime;
  return nextTime;
}

export function getCheckInProgress(checkInTime, lastCheckInTime) {
  const curTime = Date.now();
  const nextCheckInTime = getNextCheckInTime(checkInTime, lastCheckInTime);
  if (curTime > nextCheckInTime) return 0;
  return (nextCheckInTime - curTime) / MSEC_ONE_DAY;
}

export function getDisplayTime(time) {
  return moment(time).format('h:mm a');
}

export function getDisplayDate(time) {
  return moment(time).format('M/D/Y h:mm a');
}

export function hunamDuration(createdAt) {
  const interval = Date.now() - createdAt;
  const time = moment.duration(-interval).humanize(true);
  return time
    .replace(/second/g, 'sec')
    .replace(/minute/g, 'min')
    .replace(/hour/g, 'hr');
}

export function filterNotifications(notifications) {
  const results = [];
  const currentDay = moment().dayOfYear();
  let lastKey = null;
  notifications.map((notification, index) => {
    const {createdAt} = notification;
    let day = moment(createdAt).dayOfYear();
    if (day > currentDay) day -= moment(createdAt).isLeapYear() ? 366 : 365;

    let key = '';
    if (day == currentDay) key = 'Today';
    else if (day + 1 == currentDay) key = 'Yesterday';
    else key = moment(createdAt).format('MMMM DD');

    if (lastKey != key) {
      lastKey = key;
      results.push({key, items: []});
    }
    const lastResult = results[results.length - 1];
    lastResult.items.push(notification);
  });

  return results;
}

export const timeFromNow = date => {
  return moment(date).fromNow();
};
