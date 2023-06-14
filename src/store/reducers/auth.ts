import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ILoginResponse, IUser} from 'interfaces/IUser';
import {merge} from 'lodash';
import {login_with_apple, login_with_google} from 'api/auth';

interface State {
  token: string;
  userData?: IUser;
  loading: false;
}
const initialState: State = {
  token: '',
  userData: undefined,
  loading: false,
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

  extraReducers: builder => {
    builder.addCase(login_with_google.pending, (state, {payload}) => {
      state.loading = true;
    });
    builder.addCase(
      login_with_google.fulfilled,
      (state, {payload}: PayloadAction<ILoginResponse>) => {
        state.userData = payload?.user;
        state.token = payload?.token;
        state.loading = false;
      },
    );
    builder.addCase(login_with_google.rejected, (state, action) => {
      state.loading = false;
      console.log('rejected', action.error);
    });

    builder.addCase(login_with_apple.pending, (state, {payload}) => {
      state.loading = true;
    });
    builder.addCase(
      login_with_apple.fulfilled,
      (state, {payload}: PayloadAction<ILoginResponse>) => {
        state.userData = payload?.user;
        state.token = payload?.token;
        state.loading = false;
      },
    );

    builder.addCase(login_with_apple.rejected, (state, action) => {
      state.loading = false;
      console.log('rejected', action.error);
    });
  },
});

export const {setAuthStore, updateAuthStore} = authSlice.actions;

export default authSlice.reducer;
