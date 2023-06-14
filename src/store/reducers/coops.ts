import {createSlice} from '@reduxjs/toolkit';
import {
  addBirds,
  createCoop,
  createFlock,
  deleteFlock,
  getCoop,
  getFlock,
  removeBirds,
  splitFlock,
} from 'api/coop';
import {currentDateTime} from 'utils/date&Time';
import {getRandomID} from 'utils/getRandomId';

const initialState = {
  res: null,
  error: null,
  coop: [],
  offlineCoops: [],
  flock: [],
  offlineFlocks: [],

  status: 'idle',
};

export const coopSlice = createSlice({
  name: 'coop',
  initialState,
  reducers: {
    clearRes: (state, action) => {
      state.res = null;
    },
    clearError: (state, action) => {
      state.error = null;
    },
    changeStatusToIdle: (state, action) => {
      state.status = 'idle';
    },
    createOfflineCoops: (state, action) => {
      const myId = action.payload;

      const getLatestNumberOfFarm = [...state.coop, ...state.offlineCoops]
        .length;

      const createTmpCoops = {
        __v: 0,
        _id: getRandomID(),
        offlineId: getRandomID(),
        createdAt: currentDateTime,
        farm: myId,
        flocks: [],
        name: `Coop ${getLatestNumberOfFarm + 1}`,
        updatedAt: currentDateTime,
      };

      state.offlineCoops = [...state.offlineCoops, createTmpCoops];
    },
    removeSingleOfflineCoop: (state, action) => {
      const coopId = action.payload;

      const copyOfflineCoops = [...state.offlineCoops];
      const filteredCops = copyOfflineCoops.filter(
        offlineCop => offlineCop._id !== coopId,
      );

      state.offlineCoops = filteredCops;
    },

    createOfflineFlock: (state, action) => {
      const coopId = action.payload?.coopId;

      const {breed, type} = action.payload.apiBody;

      const createTmpFlock = {
        coopId: coopId,
        _id: getRandomID(),
        coop: getRandomID(),
        offlineId: getRandomID(),
        name: breed + ' ' + type,

        eggQuantity: 0,
        dateStarted: '01-01-2023',
        costPerBird: 85,
        splitted: false,
        costHistory: [],
        createdAt: '2023-06-09T09:09:37.694Z',
        updatedAt: '2023-06-09T09:09:37.694Z',
        __v: 0,
        ...action.payload.apiBody,
      };

      state.offlineFlocks = [...state.offlineFlocks, createTmpFlock];
    },
    removeSingleOfflineFlock: (state, action) => {
      const flockId = action.payload;

      const copyOfflineFlocks = [...state.offlineFlocks];
      const filteredCops = copyOfflineFlocks.filter(
        offlineFlock => offlineFlock._id !== flockId,
      );

      state.offlineFlocks = filteredCops;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getCoop.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(getCoop.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = action.payload?.issue;
        state.coop = action.payload.coop;
      })
      .addCase(createCoop.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(createCoop.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.coop = [...state.coop, action.payload?.coop];
      })
      .addCase(createCoop.rejected, (state, action) => {
        state.status = 'idle';
        console.log('rejected', action.error);
        state.error = action.payload?.issue;
      })
      .addCase(createFlock.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(createFlock.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = action.payload?.issue?.message;
        state.res = action.payload?.message;
      })
      .addCase(getFlock.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(getFlock.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.flock = action.payload?.flock;
        state.error = action.payload?.issue;
      })
      .addCase(addBirds.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(addBirds.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = action.payload?.issue;
        state.res = action.payload?.message;
      })
      .addCase(removeBirds.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(removeBirds.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = action.payload?.issue;
        state.res = action.payload?.message;
      })
      .addCase(deleteFlock.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(deleteFlock.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = action.payload?.issue;
        state.res = action.payload?.message;
      })
      .addCase(splitFlock.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(splitFlock.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = action.payload?.issue;
        state.res = action.payload?.message;
      });
  },
});

export const {
  clearRes,
  clearError,
  changeStatusToIdle,
  createOfflineCoops,
  removeSingleOfflineCoop,
  createOfflineFlock,
  removeSingleOfflineFlock,
} = coopSlice.actions;
export default coopSlice.reducer;
