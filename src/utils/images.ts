import imgEmoji1 from 'assets/images/emoji1.png';
import imgEmoji2 from 'assets/images/emoji2.png';
import imgEmoji3 from 'assets/images/emoji3.png';
import imgSos from 'assets/images/sos_w.png';
import imgZzz from 'assets/images/zzz.png';

import imgLogoG from 'assets/images/logo_g.png';

import emoji1 from 'assets/images/emoji/A.png';
import emoji2 from 'assets/images/emoji/B.png';
import emoji3 from 'assets/images/emoji/C.png';
import emoji4 from 'assets/images/emoji/D.png';
import emoji5 from 'assets/images/emoji/E.png';

import {NOTIFICATIONS} from 'config/config';

export const getNotificationStyle = (type: any, value: any) => {
  switch (type) {
    case NOTIFICATIONS.CHECKIN:
      switch (value) {
        case -1:
          return {image: emoji3, color: '#f32013'};
        case 0:
          return {image: emoji3, color: '#f7941e'};

        case 1:
          return {image: emoji1, color: '#f32013'};
        case 2:
          return {image: emoji2, color: '#fab362'};
        case 3:
          return {image: emoji3, color: '#fad64e'};
        case 4:
          return {image: emoji4, color: '#9dd4e8'};
        case 5:
          return {image: emoji5, color: '#57b4dd'};
        default:
          return {image: emoji3, color: '#fad64e'};
      }
      break;

    case NOTIFICATIONS.CHECKIN_TIME:
      return {image: imgZzz, color: '#f32013'};

    case NOTIFICATIONS.CHECKIN_DELAY:
      return {image: imgZzz, color: '#777'};

    case NOTIFICATIONS.EMERGENCY:
      return {image: imgSos, color: '#f32013', backgroundColor: '#f32013'};

    case NOTIFICATIONS.SHARE:
      return {image: imgLogoG, color: '#fdcd13'};
  }

  return {image: imgLogoG, color: '#fdcd13'};
};

export const getTrackerImage = (status: number) => {
  switch (status) {
    case 1:
      return imgEmoji1;
    case 0:
      return imgEmoji2;
    case -1:
      return imgEmoji3;
  }
  return null;
};

// import imgEmoji1 from '../../assets/images/emoji1.png';
// import imgEmoji2 from '../../assets/images/emoji2.png';
// import imgEmoji3 from '../../assets/images/emoji3.png';
// import imgSos from '../../assets/images/sos_w.png';
// import imgZzz from '../../assets/images/zzz.png';

// import imgLogoG from '../../assets/images/logo_g.png'

// import { NOTIFICATIONS } from '../config';

// export const getNotificationStyle = (type, value) => {
//   switch (type) {
//     case NOTIFICATIONS.CHECKIN:
//       switch (value) {
//         case 1: return { image: imgEmoji1, color: '#73b957' };
//         case 0: return { image: imgEmoji2, color: '#f7941e' };
//         case -1: return { image: imgEmoji3, color: '#f32013' };
//       }
//       break;

//     case NOTIFICATIONS.CHECKIN_TIME:
//       return { image: imgZzz, color: '#f32013' };

//     case NOTIFICATIONS.CHECKIN_DELAY:
//       return { image: imgZzz, color: '#777' };

//     case NOTIFICATIONS.EMERGENCY:
//       return { image: imgSos, color: '#f32013', backgroundColor: '#f32013' };

//     case NOTIFICATIONS.SHARE:
//       return { image: imgLogoG, color: '#fdcd13' };
//   }

//   return { image: imgLogoG, color: '#fdcd13' };
// }

// export const getTrackerImage = (status) => {
//   switch (status) {
//     case 1: return imgEmoji1;
//     case 0: return imgEmoji2;
//     case -1: return imgEmoji3;
//   }
//   return null;
// }
