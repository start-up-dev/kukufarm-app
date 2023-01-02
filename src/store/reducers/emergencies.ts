import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import useAxios from 'api';
import {IEmergency} from 'interfaces/IEmergency';

export const getEmergencies = createAsyncThunk(
  'getEmergencies',
  // if you type your function argument here
  async (query, {getState}) => {
    const response = await useAxios(`emergency-contact`, {
      params: query,
    });
    return response.data;
  },
);

interface EmergenciesState {
  emergencies: IEmergency[];
  loading: boolean;
}

const initialState = {
  emergencies: [],
  loading: false,
} as EmergenciesState;

export const rankSlice = createSlice({
  name: 'emergencies',
  initialState,
  reducers: {
    setEmergencies: (state, action: PayloadAction<typeof initialState>) => {
      state.emergencies = action.payload.emergencies;
    },
    addEmergencies: (state, action: PayloadAction<any>) => {
      state.emergencies = [action.payload, ...state.emergencies];
    },
    editEmergency: (state, action: PayloadAction<any>) => {
      const copyEmergencies = [...state.emergencies];
      const findIndex = copyEmergencies.findIndex(
        emergency => emergency?._id === action.payload._id,
      );

      state.emergencies[findIndex] = action.payload;
    },
    removeEmergenciesContact: (state, action: PayloadAction<any>) => {
      state.emergencies = state.emergencies.filter(
        emergencies => emergencies?._id !== action.payload,
      );
    },

    clearState: state => {
      return {...state, emergencies: []};
    },
  },

  extraReducers: builder => {
    builder.addCase(getEmergencies.pending, (state, {payload}) => {
      state.loading = true;
    });
    builder.addCase(getEmergencies.fulfilled, (state, {payload}) => {
      state.emergencies = [...state.emergencies, ...payload?.contacts];
      state.loading = false;
    });

    builder.addCase(getEmergencies.rejected, (state, action) => {
      state.loading = false;
      console.log('rejected', action.error);
    });
  },
});

export const {
  setEmergencies,
  addEmergencies,
  removeEmergenciesContact,
  editEmergency,
  clearState,
} = rankSlice.actions;

export default rankSlice.reducer;
