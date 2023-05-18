import { createSlice } from "@reduxjs/toolkit";
import {
  addBirds,
  createCoop,
  createFlock,
  deleteFlock,
  getCoop,
  getFlock,
  removeBirds,
  splitFlock,
} from "../api/coop";

const initialState = {
  res: null,
  error: null,
  coop: null,
  flock: null,
  status: "idle",
};

export const coopSlice = createSlice({
  name: "coop",
  initialState,
  reducers: {
    clearRes: (state, action) => {
      state.res = null;
    },
    clearError: (state, action) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCoop.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getCoop.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = action.payload?.issue;
        state.coop = action.payload.coop;
      })
      .addCase(createCoop.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(createCoop.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = action.payload?.issue;
      })
      .addCase(createFlock.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(createFlock.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = action.payload?.issue?.message;
        state.res = action.payload?.message;
      })
      .addCase(getFlock.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getFlock.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.flock = action.payload?.flock;
        state.error = action.payload?.issue;
      })
      .addCase(addBirds.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(addBirds.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = action.payload?.issue;
        state.res = action.payload?.message;
      })
      .addCase(removeBirds.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(removeBirds.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = action.payload?.issue;
        state.res = action.payload?.message;
      })
      .addCase(deleteFlock.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteFlock.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = action.payload?.issue;
        state.res = action.payload?.message;
      })
      .addCase(splitFlock.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(splitFlock.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = action.payload?.issue;
        state.res = action.payload?.message;
      });
  },
});

export const { clearRes, clearError } = coopSlice.actions;
