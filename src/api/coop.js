import useAxios from '.';
import {createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Store Data to AsyncStorage

// const storeData = async (value) => {
//   try {
//     await AsyncStorage.setItem("COOP", value);
//   } catch (e) {
//     console.log(e);
//   }
// };

// Create Coop

export const createCoop = createAsyncThunk(
  'coop/createCoop',
  async ({id, offlineId}, {getState}) => {
    // try {
    const res = await useAxios.post(`/coop/${id}`, {offlineId});
    console.log('Try Create Coop: ' + JSON.stringify(res.data));
    return res.data;
    // } catch (err) {
    //   console.log("Catch Create Coop: " + JSON.stringify(err.response.data));
    //   return err.response.data;
    // }
  },
);

// Get Coop

export const getCoop = createAsyncThunk('coop/getCoop', async id => {
  // try {
  const res = await useAxios.get(`/coop/${id}`);
  console.log('Try Get Coop: ' + JSON.stringify(res.data));
  return res.data;
  // } catch (err) {
  //   console.log("Catch Get Coop: " + JSON.stringify(err.response.data));
  //   return err.response.data;
  // }
});

// Create Flock

export const createFlock = createAsyncThunk('coop/createFlock', async body => {
  // try {
  const res = await useAxios.post(
    `/flock/${body.coopId || 'id'}`,
    body.apiBody,
  );
  console.log('Try Create Flock: ' + JSON.stringify(res.data));
  return res.data;
  // } catch (err) {
  //   console.log("Catch Create Flock: " + JSON.stringify(err.response.data));
  //   return err.response.data;
  // }
});

// Get Flock

export const getFlock = createAsyncThunk('coop/getFlock', async id => {
  try {
    const res = await useAxios.get(`/flock/${id}`);
    console.log('Try Get Flock: ' + JSON.stringify(res.data));
    return res.data;
  } catch (err) {
    console.log('Catch Get Flock: ' + JSON.stringify(err.response.data));
    return err.response.data;
  }
});

// Delete Flock

export const deleteFlock = createAsyncThunk('coop/deleteFlock', async id => {
  try {
    const res = await useAxios.delete(`/flock/${id}`);
    console.log('Try Delete Flock: ' + JSON.stringify(res.data));
    return res.data;
  } catch (err) {
    console.log('Catch Delete Flock: ' + JSON.stringify(err.response.data));
    return err.response.data;
  }
});

// Split Flock

export const splitFlock = createAsyncThunk('coop/splitFlock', async body => {
  try {
    const res = await useAxios.patch(`/flock/split/${body.id}`, body.data);
    console.log('Try Split Flock: ' + JSON.stringify(res.data));
    return res.data;
  } catch (err) {
    console.log('Catch Split Flock: ' + JSON.stringify(err.response.data));
    return err.response.data;
  }
});

// Add Birds

export const addBirds = createAsyncThunk('coop/addBirds', async body => {
  try {
    const res = await useAxios.post(`/bird/add`, body);
    console.log('Try Add Bird: ' + JSON.stringify(res.data));
    return res.data;
  } catch (err) {
    console.log('Catch Add Bird: ' + JSON.stringify(err.response.data));
    return err.response.data;
  }
});

// Remove Birds

export const removeBirds = createAsyncThunk('coop/removeBirds', async body => {
  try {
    const res = await useAxios.post(`/bird/remove`, body);
    console.log('Try Remove Bird: ' + JSON.stringify(res.data));
    return res.data;
  } catch (err) {
    console.log('Catch Remove Bird: ' + JSON.stringify(err.response.data));
    return err.response.data;
  }
});
