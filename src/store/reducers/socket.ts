import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {io, Socket} from 'socket.io-client';
import {SOCKET_ENDPOINT} from '../../config/http';
import {IClientToServerEvents} from '../../interfaces/IClientToServerEvents';
import {IServerToClientEvents} from '../../interfaces/IServerToClientEvents';

interface IState {
  socket: Socket<IServerToClientEvents, IClientToServerEvents> | undefined;
}

const initialState: IState = {
  socket: undefined,
};

export const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    initializeSocket: (state, action: PayloadAction<string>) => {
      if (state.socket === undefined) {
        // @ts-ignore
        state.socket = io(SOCKET_ENDPOINT, {
          auth: {
            jwtToken: action.payload,
          },
        });
      }
    },
  },
});

export const {initializeSocket} = socketSlice.actions;

export default socketSlice.reducer;
