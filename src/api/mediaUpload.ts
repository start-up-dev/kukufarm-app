import {AxiosResponse} from 'axios';
import useAxios from '.';

export interface IResponse {
  url: string;
}

export const media_upload = async (
  payload: any,
): Promise<AxiosResponse<IResponse>> => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    transformRequest: () => {
      return payload;
    },
  };
  return await useAxios.post(`utils/upload-file`, payload, config);
};
