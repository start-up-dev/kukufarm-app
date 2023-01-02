import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import useAxios from 'api';
import {ICheckIn} from 'interfaces/ICheckin';

export const getTrackList = createAsyncThunk(
  'trackList',
  // if you type your function argument here
  async (query, {getState}) => {
    const response = await useAxios(`check-in/tracks`, {
      params: query,
    });

    return response.data;
  },
);

interface TracksState {
  tracks: ICheckIn[];
  loading: boolean;
}

const initialState = {
  tracks: [],
  loading: false,
} as TracksState;

export const rankSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {
    setTracks: (state, action: PayloadAction<typeof initialState>) => {
      state.tracks = action.payload.tracks;
    },

    clearState: state => {
      return {...state, tracks: []};
    },
  },

  extraReducers: builder => {
    builder.addCase(getTrackList.pending, (state, {payload}) => {
      state.loading = true;
    });
    builder.addCase(getTrackList.fulfilled, (state, {payload}) => {
      state.tracks = [...state.tracks, ...payload?.tracks];
      state.loading = false;
    });

    builder.addCase(getTrackList.rejected, (state, action) => {
      state.loading = false;
      console.log('rejected', action.error);
    });
  },
});

export const {setTracks, clearState} = rankSlice.actions;

export default rankSlice.reducer;
