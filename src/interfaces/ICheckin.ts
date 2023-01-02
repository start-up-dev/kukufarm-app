export interface ICheckIn {
  _id: string;
  user: IUser;
  status: number;
  text: string;
  createdAt: string;
}

export interface IUser {
  _id: string;
  email: string;
  name: string;
  phoneNumber: string;
}
