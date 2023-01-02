import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IUser} from 'interfaces/IUser';
import {merge} from 'lodash';

interface State {
  token: string;
  userData?: IUser;
}
const initialState: State = {
  token: '',
  userData: undefined,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthStore: (
      state,
      action: PayloadAction<Partial<typeof initialState>>,
    ) => {
      return {...state, ...action.payload};
    },
    updateAuthStore: (state, action: PayloadAction<any>) => {
      merge(state.userData, action.payload);
    },
  },
});

export const {setAuthStore, updateAuthStore} = authSlice.actions;

export default authSlice.reducer;
