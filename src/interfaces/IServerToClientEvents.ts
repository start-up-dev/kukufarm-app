import {IMessage} from './IMessage';

export interface IServerToClientEvents {
  ON_MESSAGE_RECEIVED: (message: IMessage) => void;
}
