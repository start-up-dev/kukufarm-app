import {AxiosResponse} from 'axios';
import useAxios from '.';
import {IUser} from 'interfaces/IUser';

export const follow_user = async (
  id: string,
): Promise<AxiosResponse<IUser>> => {
  return await useAxios.post(`user/${id}/follow`);
};

export const user_subscribe = async (
  payload: string,
): Promise<AxiosResponse<IUser>> => {
  return await useAxios.post(`subscription/subscribe`, {data: payload});
};
