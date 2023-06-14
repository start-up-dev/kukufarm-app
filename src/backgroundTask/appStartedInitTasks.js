import { getCoop } from "../api/coop";
import { store } from "../store";
import { updateAppStartedGlobalState } from "../store/globalSlice";

export const appStartedInitTasks = async () => {
  const { isAppFirstStarted } = store.getState().global;
  const userData = store.getState().auth.userData;
  if (!userData?._id) return;
  console.log("isAppFirstStarted", isAppFirstStarted);
  if (!isAppFirstStarted) return;
  Promise.all([
    store.dispatch(getCoop(userData?._id)),
    store.dispatch(updateAppStartedGlobalState()),
  ]);
};
