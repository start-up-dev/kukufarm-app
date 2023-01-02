import {AxiosResponse} from 'axios';
import useAxios from '.';
import {ILoginResponse, IUser, IUserResponse} from 'interfaces/IUser';

export const loginWithGoogle = async (
  token: string,
): Promise<AxiosResponse<ILoginResponse>> => {
  return await useAxios.post('auth/google-login', {token});
};

export const login_with_id_token = async (
  payload: any,
): Promise<AxiosResponse<ILoginResponse>> => {
  return await useAxios.post('auth/login-with-id-token', payload);
};

export const updateProfile = async (
  user: Partial<IUser>,
): Promise<AxiosResponse<ILoginResponse>> => {
  return await useAxios.patch('user/update-profile', user);
};

export const get_my_profile = async (): Promise<
  AxiosResponse<{user: IUser}>
> => {
  return await useAxios.get('user/profile');
};

export const user_logout = async (): Promise<AxiosResponse<IUser>> => {
  return await useAxios.delete('auth/logout');
};

export const delete_account = async (payload: {
  reason: string;
}): Promise<AxiosResponse<IUser>> => {
  return await useAxios.delete('user/delete-account', {
    data: payload,
  });
};

// Auth
