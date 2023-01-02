export interface IConfig {
  AGORA_APP_ID: string;
  LEVEL: ILevel;
  BADGE: IBadge;
}

export interface ILevel {
  [key: string]: number;
}

export interface IBadge {
  [key: string]: string;
}

export enum Tutorial {
  FINISHED = 'FINISHED',
  EMERGENCY_CONTACT = 'EMERGENCY_CONTACT',
  ADD_EMERGENCY = 'ADD_EMERGENCY',
  SET_CHECK_IN_TIME = 'SET_CHECK_IN_TIME',
  DO_CHECK_IN = 'DO_CHECK_IN',
  EMERGENCY_ALERT_SOS = 'EMERGENCY_ALERT_SOS',

  SEARCH_EMERGENCY = 'SEARCH_EMERGENCY',
  CREATE_CIRCLE = 'CREATE_CIRCLE',
  ADD_CIRCLE_CONTACT = 'ADD_CIRCLE_CONTACT',
}
