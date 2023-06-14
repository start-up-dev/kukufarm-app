import {AxiosResponse} from 'axios';
import useAxios from '.';
import {ILoginResponse, IUser} from 'interfaces/IUser';
import {createAsyncThunk} from '@reduxjs/toolkit';

export const login_with_google = createAsyncThunk(
  'auth/authGoogle',
  async (token: string, {getState}) => {
    const response = await useAxios.post(
      `auth/login-with-google-bearer-token`,
      {
        token,
      },
    );

    return response.data;
  },
);
// export const login_with_google = async (
//   token: string,
// ): Promise<AxiosResponse<ILoginResponse>> => {
//   return await useAxios.post(`/auth/login-with-google-bearer-token`, {token});
// };

export const login_with_apple = createAsyncThunk(
  'auth/appleAuth',
  async (identityToken: string, {getState}) => {
    const response = await useAxios.post(
      `auth/login-with-apple-identity-token`,
      {
        identityToken,
      },
    );

    return response.data;
  },
);

// export const login_with_apple = async (
//   identityToken: string,
// ): Promise<AxiosResponse<ILoginResponse>> => {
//   return await useAxios.post(`/auth/login-with-apple-identity-token`, {
//     identityToken,
//   });
// };

export const updateProfile = async (
  user: Partial<IUser>,
): Promise<AxiosResponse<ILoginResponse>> => {
  return await useAxios.patch('user/update-profile', user);
};

export const get_my_profile = async (): Promise<
  AxiosResponse<{user: IUser}>
> => {
  return await useAxios.get('user/me');
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
