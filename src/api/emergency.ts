import {AxiosResponse} from 'axios';
import useAxios from '.';

export const add_emergency_contact = async (
  payload: any,
): Promise<AxiosResponse<any>> => {
  return await useAxios.post(`emergency-contact`, payload);
};

export const edit_emergency_contact = async (
  id: string,
  payload: any,
): Promise<AxiosResponse<any>> => {
  return await useAxios.patch(`emergency-contact/${id}`, payload);
};

export const delete_emergency_contact = async (
  id: string,
): Promise<AxiosResponse<any>> => {
  return await useAxios.delete(`emergency-contact/${id}`);
};
