import {AxiosResponse} from 'axios';
import useAxios from '.';

interface ICheckInPayload {
  status: number;
  text?: string;
}

export const get_quote = async (): Promise<AxiosResponse<{quote: any}>> => {
  return await useAxios.get(`quote`);
};

export const set_checkIn = async (
  payload: ICheckInPayload,
): Promise<AxiosResponse<any>> => {
  return await useAxios.patch(`check-in`, payload);
};

export const set_checkIn_time = async (payload: {
  timestamp: string;
}): Promise<AxiosResponse<any>> => {
  return await useAxios.patch(`check-in/set-time`, payload);
};
