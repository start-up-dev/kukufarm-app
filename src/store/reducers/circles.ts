import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import useAxios from 'api';
import {ISingleCircle} from 'interfaces/ICircle';
import {RootState} from 'store';

export const getCircles = createAsyncThunk(
  'getCircles',
  // if you type your function argument here
  async (query, {getState}) => {
    const response = await useAxios(`circle/my-circle`, {
      params: query,
    });
    return response.data;
  },
);

interface CirclesState {
  circles: ISingleCircle[];
  loading: boolean;
}

const initialState = {
  circles: [],
  loading: false,
} as CirclesState;

export const rankSlice = createSlice({
  name: 'circles',
  initialState,
  reducers: {
    setCircles: (state, action: PayloadAction<typeof initialState>) => {
      state.circles = action.payload.circles;
    },
    addCircles: (state, action: PayloadAction<any>) => {
      state.circles = [action.payload, ...state.circles];
    },

    removeCircle: (state, action: PayloadAction<any>) => {
      state.circles = state.circles.filter(
        item => item?._id !== action.payload.circleId,
      );
    },
    removeCirclesContact: (state, action: PayloadAction<any>) => {
      const copyCircle = [...state.circles];

      // console.log(action.payload);

      const findCircleIndex = copyCircle.findIndex(
        item => item?._id === action.payload.circleId,
      );
      if (findCircleIndex !== -1) {
        const filtered = copyCircle[findCircleIndex].data.filter(
          item => item?.phoneNumber !== action?.payload?.phoneNumber,
        );

        copyCircle[findCircleIndex].data = filtered;
        state.circles = copyCircle;
      }
    },
    addMemberInCircle: (state, action: PayloadAction<any>) => {
      const copyCircle = [...state.circles];

      const findCircleIndex = copyCircle.findIndex(
        item => item?._id === action.payload.circle,
      );
      if (findCircleIndex !== -1) {
        copyCircle[findCircleIndex].data.unshift(action.payload);
      }

      state.circles = copyCircle;
    },
    updateCircleName: (state, action: PayloadAction<any>) => {
      const copyCircle = [...state.circles];

      const findCircleIndex = copyCircle.findIndex(
        item => item?._id === action.payload.circleId,
      );
      if (findCircleIndex !== -1) {
        copyCircle[findCircleIndex].name = action.payload.circleName;
      }

      state.circles = copyCircle;
    },

    clearState: state => {
      return {...state, circles: []};
    },
  },

  extraReducers: builder => {
    builder.addCase(getCircles.pending, (state, {payload}) => {
      state.loading = true;
    });
    builder.addCase(getCircles.fulfilled, (state, {payload}) => {
      state.circles = [...state.circles, ...payload?.circles];
      state.loading = false;
    });

    builder.addCase(getCircles.rejected, (state, action) => {
      state.loading = false;
      console.log('rejected', action.error);
    });
  },
});

export const {
  setCircles,
  addCircles,
  updateCircleName,
  removeCirclesContact,
  removeCircle,
  addMemberInCircle,
  clearState,
} = rankSlice.actions;

export default rankSlice.reducer;
