import {IUser} from 'interfaces/IFeed';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import useAxios from 'api';

export const searchUsers = createAsyncThunk(
  'searchUsers',
  // if you type your function argument here
  async (query: {search: string}, {getState}) => {
    const response = await useAxios(`user`, {
      params: query,
    });
    return response.data;
  },
);
interface IChatMessagesState {
  users: IUser[];
  loading: boolean;
}

const initialState = {
  users: [],
  loading: false,
} as IChatMessagesState;

export const searchUsersSlice = createSlice({
  name: 'searchUsers',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<typeof initialState>) => {
      state.users = action.payload.users;
    },

    clearState: state => {
      return {...state, users: []};
    },
  },

  extraReducers: builder => {
    builder.addCase(searchUsers.pending, (state, {payload}) => {
      state.loading = true;
    });
    builder.addCase(searchUsers.fulfilled, (state, {payload}) => {
      state.users = [...state.users, ...payload.data];
      state.loading = false;
      // console.log('FUlfilled', payload);
    });

    builder.addCase(searchUsers.rejected, (state, action) => {
      state.loading = false;
      console.log('rejected', action.error);
    });
  },
});

export const {setUsers, clearState} = searchUsersSlice.actions;

export default searchUsersSlice.reducer;
