import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState = {
  loader: false,
  isEditing: false,
};

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    toggleLoader: state => {
      return {...state, loader: !state.loader};
    },
    toggleEditing: state => {
      return {...state, isEditing: !state.isEditing};
    },
  },
});

export const {toggleLoader, toggleEditing} = globalSlice.actions;

export default globalSlice.reducer;
