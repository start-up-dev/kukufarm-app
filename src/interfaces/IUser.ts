export interface IUser {
  _id: string;
  avatar: string;
  name: string;
  config: IConfig;
  email: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  isPurchased: boolean;
  lastNotifyStep: number;
  phoneNumber: string;
  checkInTime: number;
  lastCheckInTime: number;
  lastNotifyTime: number;
  lastStatus: number;
  checkInStack: number;
  point: number;
}

export interface IConfig {
  checkInAlerts: boolean;
  checkInMode: 'in_a_time' | 'in_a_day';
  emailAlerts: boolean;
  smsAlerts: boolean;
  vacationMode: boolean;
}
export interface IUserResponse {
  user: IUser;
}

export interface ILoginResponse {
  token: string;
  user: IUser;
}
