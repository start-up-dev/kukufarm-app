import {IUser} from './ICheckin';
import {ICircle} from './ICircle';

export interface IMessage {
  circleId: string;
  sender: IUser;
  text: string;
}
