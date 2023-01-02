import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import useAxios from 'api';
import {IMyCircle} from 'interfaces/ICircle';

export const getMyCircles = createAsyncThunk(
  'getMyCircles',
  // if you type your function argument here
  async (query, {getState}) => {
    const response = await useAxios(`circle/others-circle`, {
      params: query,
    });
    return response.data;
  },
);

interface myCirclesState {
  myCircles: IMyCircle[];
  loading: boolean;
}

const initialState = {
  myCircles: [],
  loading: false,
} as myCirclesState;

export const rankSlice = createSlice({
  name: 'myCircles',
  initialState,
  reducers: {
    setMyCircles: (state, action: PayloadAction<typeof initialState>) => {
      state.myCircles = action.payload.myCircles;
    },

    removeMyCircle: (state, action: PayloadAction<any>) => {
      state.myCircles = state.myCircles.filter(
        myCircles => myCircles?._id !== action.payload,
      );
    },

    clearState: state => {
      return {...state, myCircles: []};
    },
  },

  extraReducers: builder => {
    builder.addCase(getMyCircles.pending, (state, {payload}) => {
      state.loading = true;
    });
    builder.addCase(getMyCircles.fulfilled, (state, {payload}) => {
      state.myCircles = [...state.myCircles, ...payload?.circles];
      state.loading = false;
    });

    builder.addCase(getMyCircles.rejected, (state, action) => {
      state.loading = false;
      console.log('rejected', action.error);
    });
  },
});

export const {setMyCircles, removeMyCircle, clearState} = rankSlice.actions;

export default rankSlice.reducer;
