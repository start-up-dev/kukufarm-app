import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Tutorial} from 'interfaces/IConfig';

const initialState = {
  step: Tutorial.FINISHED,
};

export const tutorialSlice = createSlice({
  name: 'tutorial',
  initialState,
  reducers: {
    updateTutorialStep: (state, action) => {
      return {...state, step: action.payload};
    },
  },
});

export const {updateTutorialStep} = tutorialSlice.actions;

export default tutorialSlice.reducer;
