import {createCoop} from 'api/coop';
import {store} from 'store';
import {removeSingleOfflineCoop} from 'store/reducers/coops';

export const createNewOfflineCoops = () => {
  const offlineCoops = store.getState().coops.offlineCoops;

  console.log('offlineCoops', offlineCoops);

  if (offlineCoops.length == 0) return;
  return Promise.all(
    offlineCoops.map(coop => {
      store.dispatch(createCoop({id: coop.farm, offlineId: coop.offlineId}));
      store.dispatch(removeSingleOfflineCoop(coop._id));
    }),
  );
};
