import Axios from ".";
import { createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

//Store Data to AsyncStorage

const storeData = async (value) => {
  try {
    await AsyncStorage.setItem("TOKEN", value);
  } catch (e) {
    console.log(e);
  }
};

// Google Auth

export const googleAuth = createAsyncThunk("auth/googleAuth", async (body) => {
  try {
    const res = await Axios.post(`/auth/login-with-google-bearer-token`, body);
    storeData(res.data.token);
    return res.data.user;
  } catch (err) {
    return err.response.data;
  }
});

// Google Auth

export const appleAuth = createAsyncThunk("auth/appleAuth", async (body) => {
  try {
    const res = await Axios.post(`/auth/login-with-apple-identity-token`, body);
    storeData(res.data.token);
    console.log(JSON.stringify(res.data));
    return res.data.user;
  } catch (err) {
    console.log(JSON.stringify(err.response));
    return err.response.data;
  }
});

// Get Me

export const getMe = createAsyncThunk("auth/getMe", async () => {
  try {
    const res = await Axios.get(`/user/me`);
    return res.data.user;
  } catch (err) {
    return err.response.data;
  }
});

// Update User

export const updateMe = createAsyncThunk("auth/updateMe", async (body) => {
  try {
    const res = await Axios.patch(`/user`, body);
    console.log("Try Update: " + JSON.stringify(res.data));
    return res.data;
  } catch (err) {
    console.log("Catch Update: " + JSON.stringify(err.response.data));
    return err.response.data;
  }
});
