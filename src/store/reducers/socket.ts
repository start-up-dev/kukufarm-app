import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IStream} from 'interfaces/IStream';
import {IUser} from 'interfaces/IUser';
import {Socket} from 'socket.io-client';

interface ITransaction {
  gift: {
    name: string;
    price: number;
    url: string;
    category:
      | 'draw'
      | 'popular'
      | 'events'
      | 'luxury'
      | 'emoji'
      | 'privilege'
      | 'backpack';
  };
  sender: IUser;
  receiver: IUser;
  beans: number;
  quantity: number;
}

interface ServerToClientEvents {
  ON_STREAM_JOINED: (stream: IStream, accessToken: string) => void;
  ON_SOMETHING_WRONG: (streamID: string, message: string) => void;
  ON_CREATE_LIVE_STREAM: (stream: IStream) => void;
  ON_A_AUDIENCE_JOIN: (user: IUser) => void;
  ON_A_AUDIENCE_LEAVE: (userID: string) => void;
  ON_A_JOIN_REQUEST_ARRIVED: (user: IUser) => void;
  ON_JOIN_REQUEST_APPROVED: () => void;
  ON_STREAM_UPDATED: (key: string, value: any) => void;
  ON_LIVE_STREAM_MESSAGE_RECEIVED: (sender: IUser, message: string) => void;
  ON_GIFT_RECEIVED: (transaction: ITransaction) => void;
  ON_MUTED_BY_HOST: (media: 'mic' | 'camera', state: boolean) => void;
  ON_APP_ID_CHANGED: (appId: string) => void;
}

interface ClientToServerEvents {
  CREATE_LIVE_STREAM: (mode: string) => void;
  STREAM_END: (streamID: string) => void;
  JOIN_LIVE_STREAM: (streamID: string) => void;
  LEAVE_LIVE_STREAM: (streamID: string) => void;
  SEND_JOIN_REQUEST: (streamID: string) => void;
  JOIN_REQUEST_APPROVE: (streamID: string, userID: string) => void;
  MIC_STATE_CHANGED: (
    streamID: string,
    state: boolean,
    chairName?: string,
  ) => void;
  CAMERA_STATE_CHANGED: (
    streamID: string,
    state: boolean,
    chairName?: string,
  ) => void;
  LEAVE_CHAIR: (streamID: string) => void;
  KICK_OUT_FROM_STREAM: (steamID: string, userID: string) => void;
  BLOCK_USER: (steamID: string, userID: string) => void;
  LIVE_STREAM_MESSAGE_SEND: (streamID: string, message: string) => void;
  SEND_EMOJI: (streamID: string, chair_name: string, animation: string) => void;
}
interface IState {
  socket?: Socket<ServerToClientEvents, ClientToServerEvents>;
  error?: any;
}

const initialState: IState = {};

export const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    socketConnectSuccess: (
      state,
      action: PayloadAction<Socket<ServerToClientEvents, ClientToServerEvents>>,
    ) => {
      return {...state, ...action.payload};
    },
    socketConnectFail: (
      state,
      action: PayloadAction<Socket<ServerToClientEvents, ClientToServerEvents>>,
    ) => {
      return {...state, ...action.payload};
    },
    clearSocket: state => {
      return {};
    },
  },
});

export const {socketConnectSuccess, socketConnectFail, clearSocket} =
  socketSlice.actions;

export default socketSlice.reducer;
