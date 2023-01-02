import {AxiosResponse} from 'axios';
import {IComment} from 'interfaces/IComment';
import {IListResponse} from 'interfaces/IResponse';
import {IBlockedUsers, IConfig, IUser} from 'interfaces/IUser';
import useAxios from '.';

interface IGetPeople {
  userId?: string;
  page?: number;
  type: 'friends' | 'followers' | 'followings';
}

export interface IBlockedUsersResponse<T> {
  users: T[];
}

export const get_people = async (
  arg: IGetPeople,
): Promise<AxiosResponse<any>> => {
  return await useAxios.get(`user/${arg.userId}/${arg.type}`, {params: arg});
};

export const get_blocked_users = async (
  args: any,
): Promise<AxiosResponse<IBlockedUsersResponse<IBlockedUsers>>> => {
  return await useAxios.get(`user/blocked_users`, {params: args});
};

export const updateFcmToken = async (
  data: {FCMToken: string},
  callback: (success: boolean, data: any) => void,
) => {
  try {
    const res = await useAxios.patch('user/update-fcm-token', data);
    callback(true, res.data);
  } catch (err) {
    // let errors =
    //   typeof err.response !== "undefined"
    //     ? err?.response?.data?.error
    //     : err?.message;
    callback(false, err);
  }
};

export const phone_otp_send = async (
  payload: any,
): Promise<AxiosResponse<any>> => {
  return await useAxios.post(`auth/send-otp`, payload);
};

export const phone_otp_verify = async (
  payload: any,
): Promise<AxiosResponse<any>> => {
  return await useAxios.post(`auth/verify-phone-number`, payload);
};

export const toggle_config = async (
  name: keyof IConfig,
): Promise<AxiosResponse<any>> => {
  return await useAxios.patch(`user/toggle-config/${name}`);
};
