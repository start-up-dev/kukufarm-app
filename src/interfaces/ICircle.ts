export interface ICircle {
  _id: string;
  name: string;
  data: ICircleMember[];
}

export interface ICircleMember {
  phoneNumber: string;
  name: string;
  _id: string;
  lastCheckInStatus: number;
  email: string;
}

export interface ISingleCircle extends ICircle {
  data: ICircleMember[];
}

export interface IMyCircle extends ICircleMember {
  circle: ICircle;
}
