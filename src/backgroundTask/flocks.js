import {createFlock} from '../api/coop';
import {store} from '../store';
import {removeSingleOfflineFlock} from 'store/reducers/coops';

export const createNewOfflineFlocks = () => {
  const offlineFlocks = store.getState().coops.offlineFlocks;

  console.log('offlineFlocks', offlineFlocks);
  if (offlineFlocks.length == 0) return;
  return Promise.all(
    offlineFlocks.map(flock => {
      console.log('====================================');
      console.log('Server Flock Data', flock);
      console.log('====================================');
      store.dispatch(createFlock({coopId: flock.coopId, apiBody: flock}));
      store.dispatch(removeSingleOfflineFlock(flock._id));
    }),
  );
};
