import { createSlice } from "@reduxjs/toolkit";
import { appleAuth, getMe, googleAuth, updateMe } from "../api/auth";

const initialState = {
  loggedIn: false,
  res: null,
  userData: null,
  error: null,
  status: "idle",
  sessionId: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logIn: (state, action) => {
      state.loggedIn = true;
    },
    logOut: (state, action) => {
      state.loggedIn = false;
      state.userData = null;
    },
    clearRes: (state, action) => {
      state.res = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(googleAuth.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(googleAuth.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = action.payload?.issue;
        state.userData = action.payload;
      })
      .addCase(appleAuth.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(appleAuth.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = action.payload?.issue;
        state.userData = action.payload;
      })
      .addCase(getMe.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = action.payload?.issue;
        state.userData = action.payload;
      })
      .addCase(updateMe.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(updateMe.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = action.payload?.issue;
        state.res = action.payload;
      });
  },
});

export const { logIn, logOut, clearRes } = authSlice.actions;
