export interface IUser {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  userName: string;
  picture: string;
  appleId: string;
  role: string;
  currency: string;
  plan: string;
  eggsPerTray: number;
  flocks: any[];
  coWorkers: any[];
  createdAt: string;
  updatedAt: string;

  coops: string[];
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
